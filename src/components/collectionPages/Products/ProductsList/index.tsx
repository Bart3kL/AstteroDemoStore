import { SingleProduct } from "@/components/shared/SingleProduct";

import type { ProductsListProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActiveFilters, wrapperNoResults, wrapperEmpty } = styles;

export const ProductsList = ({ products, showDesktopFilters }: ProductsListProps) => {
	return (
		<div
			className={cx(
				wrapper,
				showDesktopFilters && wrapperActiveFilters,
				products.length === 0 && wrapperEmpty,
			)}
		>
			{products.map((product, idx) => (
				<SingleProduct key={product.id} {...product} idx={idx} />
			))}
			{products.length === 0 && (
				<div className={wrapperNoResults}>
					<h2>No products found</h2>
					<p>There are no products matching the selection</p>
				</div>
			)}
		</div>
	);
};
