import type { Product } from "@/lib/shopify/functions/product/types";

export type ProductProps = Pick<Product, "tags" | "options" | "title" | "handle"> & {
	variants: Product["variants"];
	idx: number;
};
