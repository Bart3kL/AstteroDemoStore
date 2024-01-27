import { create } from "zustand";

export type CartStateProps = {
	isActive: boolean;
	handleToggleCart: () => void;
};

export const useCartState = create<CartStateProps>((set, get) => ({
	isActive: false,
	handleToggleCart: async () => {
		const isActive = get().isActive;
		set({ isActive: !isActive });
	},
}));
