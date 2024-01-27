import { type Product } from "@/lib/shopify/functions/product/types";

export interface BreadCrumbsProps {
	breadCrumbs: Product["breadCrumbs"];
	title: string;
}
