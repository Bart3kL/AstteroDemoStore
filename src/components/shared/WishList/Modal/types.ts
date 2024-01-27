import type { ProductWishList } from "@/lib/shopify/functions/product/types";

export type ModalProps = {
	title: string;
	description: string;
	addToCartButtonLabel: string;
	clearWishlistLabel: string;
	saveChangesButtonLabel: string;

	products: ProductWishList[];
	addToWishList: (id: string, event: any, onlyBoom: boolean) => void;
	removeFromWishList: (id: string, all?: boolean) => void;
	handleToggle: () => void;
	setProducts: (products: ProductWishList[]) => void;
};
