import { NewAndDiscountProducts } from "@/components/shared/NewAndDiscountProducts";

import type { NewAndDiscountProductsSectionProps } from "./types";

export const NewAndDiscountProductsSection = async ({
	products,
	newAndDiscountProducts,
}: NewAndDiscountProductsSectionProps) => {
	const saleProducts = products.filter(
		(product) =>
			Number(product.variants[0].compareAtPrice?.amount) > Number(product.variants[0].price.amount),
	);
	const newProducts = products.filter((product) => product.tags.includes("new"));

	const preparedData = {
		...newAndDiscountProducts,
		saleProducts,
		newProducts,
	};

	return (
		<section>
			<NewAndDiscountProducts {...preparedData} />
		</section>
	);
};
