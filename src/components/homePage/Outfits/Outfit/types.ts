import { type Product } from "@/lib/shopify/functions/product/types";

export interface OutfitProps {
	products: Product[];
	freeProduct: Product;
	idx: number;

	handleSlideClick: (slideIndex: number) => void;
}
