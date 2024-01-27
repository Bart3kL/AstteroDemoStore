import { type Product } from "@/lib/shopify/functions/product/types";

export type DetailsProps = Pick<
	Product,
	"title" | "handle" | "options" | "rating" | "variants" | "description"
> & {
	setCurrentVariant: (variant: Product["variants"][0]) => void;
	currentVariant: Product["variants"][0];
};
