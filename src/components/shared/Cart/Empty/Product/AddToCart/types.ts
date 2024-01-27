import { type Product } from "@/lib/shopify/functions/product/types";

export interface AddToCartProps {
	variants: Product["variants"];
	id: string;
	isBoom: boolean;
	quantityAvailable: number;
	currentVariantIsAvailableForSale: boolean;
}
