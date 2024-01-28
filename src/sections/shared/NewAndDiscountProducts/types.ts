import { type Product } from "@/lib/shopify/functions/product/types";

export interface NewAndDiscountProductsSectionProps {
	newAndDiscountProducts: NewAndDiscountProductsCacheProps;
}

export type NewAndDiscountProductsCacheProps = {
	title: string;
	saleTitle: string;
	newTitle: string;
	newProducts: Product[];
	saleProducts: Product[];
};
