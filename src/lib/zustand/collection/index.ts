import { create } from "zustand";

export type CollectionProps = {
	brandFilters: string[];
	setBrandFilters: (size: string[]) => void;
};

export const useCollectionBrandFilters = create<CollectionProps>((set) => ({
	brandFilters: [],
	setBrandFilters: async (brands) => {
		set({ brandFilters: brands });
	},
}));
