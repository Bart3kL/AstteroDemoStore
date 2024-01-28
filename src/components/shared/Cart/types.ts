import type { Cart } from "@/lib/shopify/functions/cart/types";
// import type { Product } from "@/lib/shopify/functions/product/types";

export interface CartProps {
	cart: Cart | undefined;
	// saleProducts: Product[];
}
