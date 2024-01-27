import { type Product } from "@/lib/shopify/functions/product/types";

export interface EmptyProps {
	saleProducts: Product[];
	description: string;
	icon: string;
	title: string;
}
