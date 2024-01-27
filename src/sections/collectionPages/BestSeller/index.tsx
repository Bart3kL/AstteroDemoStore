import { BestSeller } from "@/components/collectionPages/BestSeller";

import type { BestSellerProps } from "./types";

export const BestSellerSection = async ({ product }: BestSellerProps) => {
	return (
		<section>
			<BestSeller {...product} />
		</section>
	);
};
