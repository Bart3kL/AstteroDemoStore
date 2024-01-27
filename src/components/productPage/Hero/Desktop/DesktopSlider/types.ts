import { type Product } from "@/lib/shopify/functions/product/types";

export type MobileSliderProps = Pick<Product, "title"> & {
	images: string[];

	actualColor: string;
};
