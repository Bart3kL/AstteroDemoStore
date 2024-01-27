import { type Product } from "@/lib/shopify/functions/product/types";

export type DetailsProps = Pick<
	Product,
	"title" | "handle" | "options" | "rating" | "breadCrumbs" | "variants" | "description"
> & {
	currentSlideIdx: number;
	imagesLength: number;
	setCurrentSlideIdx: (idx: number) => void;
	mainInstanceRef: any;
	setCurrentVariant: (variant: Product["variants"][0]) => void;
	currentVariant: Product["variants"][0];
	bundles: {
		products: Product[];
		freeProduct: Product;
	};
};
