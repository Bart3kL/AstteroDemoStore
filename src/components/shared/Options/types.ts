import type { ProductVariant, Product } from "@/lib/shopify/functions/product/types";

export type OptionsProps = {
	setCurrentVariant: (variant: ProductVariant) => void;
	currentVariant: ProductVariant;
	variants: ProductVariant[];
	title: string;
	handle: string;
	rating: Product["rating"];
	preparedOptions: {
		[key: string]: string[];
	};
	hideHeader?: boolean;
	areBigSize?: boolean;
	areBigMaterial?: boolean;
	colorsWithImages?: boolean;
	isBundle?: boolean;
};
