import { WishList } from "@/components/shared/WishList";

import type { WishListSectionProps } from "./types";

export const WishListSection = async ({ wishlist }: WishListSectionProps) => {
	return (
		<section>
			<WishList wishlistData={wishlist} />
		</section>
	);
};
