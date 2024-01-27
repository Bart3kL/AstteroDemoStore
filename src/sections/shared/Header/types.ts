import { type Product } from "@/lib/shopify/functions/product/types";

export interface HeaderProps {
	products: Product[];
	subCollections?: {
		handle: string;
		title: string;
	}[];
}
