import { CustomersAlsoPurchased } from "@/components/productPage/CustomersAlsoPurchased";

import type { CustomersAlsoPurchasedProps } from "./types";

export const CustomersAlsoPurchasedSection = async ({ products }: CustomersAlsoPurchasedProps) => {
	return (
		<section>
			<CustomersAlsoPurchased products={products} />
		</section>
	);
};
