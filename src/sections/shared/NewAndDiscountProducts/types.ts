import { type Product } from "@/lib/shopify/functions/product/types";

export interface NewAndDiscountProductsSectionProps {
	products: Product[];
	newAndDiscountProducts: NewAndDiscountProductsCacheProps;
}

export type NewAndDiscountProductsCacheProps = {
	title: string;
	saleTitle: string;
	newTitle: string;
};
