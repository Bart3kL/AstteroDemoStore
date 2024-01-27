import type { ProductOption, ProductVariant } from "@/lib/shopify/functions/product/types";

export type VariantOptionsProps = ProductOption & {
	setCurrentVariant: (variant: ProductVariant) => void;
	currentVariant: ProductVariant;
	variants: ProductVariant[];
	areBigSize?: boolean;
	isBundle?: boolean;
};
