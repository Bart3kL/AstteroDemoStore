"use client";

import { useEffect } from "react";
import { create } from "zustand";

export type WishListStore = {
	variantIds: string[];
	isActive: boolean;
	isAnimation: boolean;
	handleToggle: () => void;
	addVariants: (ids: string[]) => void;
	addToWishList: (id: string, event: any, onlyBoom: boolean) => void;
	removeFromWishList: (id: string, all?: boolean) => void;
};

import { addMovingCircle } from "./utils";

export const useWishListStateZustand = create<WishListStore>((set, get) => ({
	variantIds: [],
	isActive: false,
	isAnimation: false,
	handleToggle: () => set((state) => ({ isActive: !state.isActive })),
	addVariants: (ids: string[]) => set({ variantIds: ids }),
	addToWishList: async (id, event, onlyBoom) => {
		const variantIds = get().variantIds;

		const expiresDate = new Date();
		expiresDate.setFullYear(expiresDate.getFullYear() + 1);

		if (!variantIds.includes(id)) {
			const updatedIds = [...variantIds, id];

			set({ variantIds: updatedIds });

			document.cookie = `variantIds=${updatedIds.join(",")}; expires=${expiresDate.toUTCString()}`;
			if (onlyBoom) {
				const isDesktop = window && window.innerWidth >= 1024;

				const setAnimationFalse = () => set({ isAnimation: false });
				await addMovingCircle(event, setAnimationFalse, isDesktop, onlyBoom);
			} else {
				set({ isAnimation: true });
				const isDesktop = window && window.innerWidth >= 1024;

				const setAnimationFalse = () => set({ isAnimation: false });
				await addMovingCircle(event, setAnimationFalse, isDesktop, onlyBoom);
			}
		} else {
			console.log(`Id: ${id} already exists in wishlist.`);
		}
	},
	removeFromWishList: (id, all) => {
		if (all) {
			set({ variantIds: [] });
			return;
		}

		const variantIds = get().variantIds;

		const updatedIds = variantIds.filter((variantId) => variantId !== id);

		const expiresDate = new Date();
		expiresDate.setFullYear(expiresDate.getFullYear() + 1);

		if (updatedIds.length === 0) {
			document.cookie = `variantIds=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
		} else {
			document.cookie = `variantIds=${updatedIds.join(",")}; expires=${expiresDate.toUTCString()}`;
		}

		set({ variantIds: updatedIds });
	},
}));

export const useWishListState = () => {
	const zustand = useWishListStateZustand();

	const { addVariants } = zustand;
	useEffect(() => {
		if (document.cookie.includes("variantIds")) {
			const cookies = document.cookie.split(";");
			const cookieObject: { [key: string]: string } = {};

			cookies.forEach((cookie) => {
				const [name, value] = cookie.trim().split("=");
				cookieObject[name] = value;
			});

			const variantIds = cookieObject.variantIds.split(",");

			addVariants(variantIds);
		}
	}, [addVariants]);

	return {
		...zustand,
	};
};
