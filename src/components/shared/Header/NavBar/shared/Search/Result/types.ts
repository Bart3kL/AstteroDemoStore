import type { SearchProduct } from "@/lib/shopify/functions/product/types";

export type ResultProps = SearchProduct & {
	idx: number;
};
