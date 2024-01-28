export interface WishListSectionProps {
	wishlist: {
		empty: {
			title: string;
			description: string;
			icon: string;
		};

		products: {
			title: string;
			description: string;
			addToCartButtonLabel: string;
			clearWishlistLabel: string;
			saveChangesButtonLabel: string;
		};
	};
}
