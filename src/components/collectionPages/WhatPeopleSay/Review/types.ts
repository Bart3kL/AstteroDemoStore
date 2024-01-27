import type { Product } from "@/lib/shopify/functions/product/types";

export type ReviewProps = Product & {
	idx: number;
};
