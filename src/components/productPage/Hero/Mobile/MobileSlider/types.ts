import { type Product } from "@/lib/shopify/functions/product/types";

export type MobileSliderProps = Pick<Product, "title" | "tags"> & {
	images: string[];

	currentVariant: Product["variants"][0];
	currentSlideIdx: number;
	setCurrentSlideIdx: (idx: number) => void;
	jsEnabled: boolean;
	mainSliderRef: any;
	mainInstanceRef: React.MutableRefObject<any>;
	variants: Product["variants"];
};
