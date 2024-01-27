import { create } from "zustand";

export type OutOfStockNotificationStateProps = {
	isActive: boolean;
	currentVariantId: string;
	handleToggle: () => void;
	addVariantId: (variantId: string) => void;
};

export const useOutOfStockNotificationStatePropsState = create<OutOfStockNotificationStateProps>(
	(set, get) => ({
		isActive: false,
		currentVariantId: "",
		handleToggle: async () => {
			const isActive = get().isActive;
			set({ isActive: !isActive });
		},
		addVariantId: async (variantId: string) => {
			set({ currentVariantId: variantId });
		},
	}),
);
