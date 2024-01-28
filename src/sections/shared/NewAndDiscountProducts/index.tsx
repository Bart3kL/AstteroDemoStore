import { NewAndDiscountProducts } from "@/components/shared/NewAndDiscountProducts";

import type { NewAndDiscountProductsSectionProps } from "./types";

export const NewAndDiscountProductsSection = async ({
	newAndDiscountProducts,
}: NewAndDiscountProductsSectionProps) => {
	return (
		<section>
			<NewAndDiscountProducts {...newAndDiscountProducts} />
		</section>
	);
};
