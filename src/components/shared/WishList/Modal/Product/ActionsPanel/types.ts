export interface ActionsPanelProps {
	showOptions: boolean;
	removeFromWishList: () => void;
	handleDeleteSignleProductFromWishlist: () => void;
	handleToggle: () => void;
	currentVariantId: string;
	quantityAvailable: number;
	currentVariantIsAvailableForSale: boolean;
}
