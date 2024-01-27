import { Products } from "@/components/collectionPages/Products";

import type { ProductsProps } from "./types";

export const ProductsSection = async ({
	products,
	initialPageNumber,
	title,
	preparedFilterParams,
}: ProductsProps) => {
	return (
		<div>
			<Products
				products={products}
				initialPageNumber={initialPageNumber}
				title={title}
				preparedFilterParams={preparedFilterParams}
			/>
		</div>
	);
};
