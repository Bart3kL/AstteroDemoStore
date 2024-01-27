import type { ProductWishList } from "@/lib/shopify/functions/product/types";

export type ProductProps = ProductWishList & {
	addToWishList: (id: string, event: any, onlyBoom: boolean) => void;
	removeFromWishList: (id: string) => void;
	handleDeleteSignleProductFromWishlist: () => void;
	saveChangesButtonLabel: string;
};
