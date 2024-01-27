export interface ConfrimationModalProps {
	confirmationModal: boolean;
	setConfirmationModal: (v: boolean) => void;
	totalPriceWithDiscount: number;
	price: number;
	totalPriceBeforeDiscount: string;
	hideModal: () => void;
	currentVariantId: string;
	savedMoney: string;
	bundleProductsAddToCart: {
		quantity: number;
		merchandiseId: string;
	}[];
}
