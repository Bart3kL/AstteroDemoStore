export interface AddToCartProps {
	isBundle?: boolean;
	setConfirmationModal?: (v: boolean) => void;
	currentVariantId: string;
	hideModal?: () => void;
	quantityAvailable: number;
	currentVariantIsAvailableForSale: boolean;
	bundleProductsAddToCart?: {
		quantity: number;
		merchandiseId: string;
	}[];
}
