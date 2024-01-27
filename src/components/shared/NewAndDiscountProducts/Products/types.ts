import type { Product } from "../../../../lib/shopify/functions/product/types";

export interface ProductsProps {
	products: Product[];
	activeGroup: string;
}
