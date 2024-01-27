import type { ProductVariant, Product } from "@/lib/shopify/functions/product/types";

export type ModalProps = Pick<Product, "rating" | "handle" | "title" | "description"> & {
	images: string[];
	handleToggleModal: () => void;
	showModal: boolean;
	actualColor: string;

	rating: Product["rating"];
	preparedOptions: {
		[key: string]: string[];
	};
	setCurrentVariant: (variant: ProductVariant) => void;
	currentVariant: ProductVariant;
	variants: ProductVariant[];
	isBundle?: boolean;
	totalPriceWithDiscount?: number;
	totalPriceBeforeDiscount?: string;
	isFreeProduct?: boolean;
	hideModal: () => void;
	savedMoney?: string;
	bundleProductsAddToCart?: {
		quantity: number;
		merchandiseId: string;
	}[];
};
