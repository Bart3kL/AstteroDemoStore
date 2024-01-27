import { type Product } from "@/lib/shopify/functions/product/types";

export type MobileProps = Pick<
	Product,
	"breadCrumbs" | "title" | "tags" | "description" | "rating" | "options" | "handle"
> & {
	actualColor: string;
	images: string[];
	currentVariant: Product["variants"][0];
	variants: Product["variants"];
	setCurrentVariant: (variant: Product["variants"][0]) => void;
	bundles: {
		products: Product[];
		freeProduct: Product;
	};
};
