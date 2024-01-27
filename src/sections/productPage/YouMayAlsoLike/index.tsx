import { YouMayAlsoLike } from "@/components/productPage/YouMayAlsoLike";

import type { YouMayAlsoLikeSectionProps } from "./types";

export const YouMayAlsoLikeSection = async ({ products }: YouMayAlsoLikeSectionProps) => {
	return (
		<section>
			<YouMayAlsoLike products={products} />
		</section>
	);
};
