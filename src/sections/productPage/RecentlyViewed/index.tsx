import { RecentlyViewed } from "@/components/productPage/RecentlyViewed";

import type { CustomersAlsoPurchasedProps } from "./types";

export const RecentlyViewedSection = async ({ products }: CustomersAlsoPurchasedProps) => {
	return (
		<section>
			<RecentlyViewed products={products} />
		</section>
	);
};
