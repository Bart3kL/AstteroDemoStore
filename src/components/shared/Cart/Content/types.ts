import type { ProductWishList } from "@/lib/shopify/functions/product/types";
import type { WishlistProps } from "@/server/cache/shared/wishlist/types";

export type ModalProps = WishlistProps["products"] & {
	products: ProductWishList[];
	addToWishList: (id: string, event: any, onlyBoom: boolean) => void;
	removeFromWishList: (id: string, all?: boolean) => void;

	setProducts: (products: ProductWishList[]) => void;
};
