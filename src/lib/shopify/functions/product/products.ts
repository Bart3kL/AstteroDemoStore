import type { Product, ShopifyProductsOperation } from "../../functions/product/types";
import { TAGS } from "../../constants";
import { getProductsQuery, getWishlistProductsQuery } from "../../queries/product";
import { reshapeProducts, removeEdgesAndNodes } from "../../utils";
import { shopifyFetch } from "../..";

export async function getProducts({
	query,
	reverse,
	sortKey,
}: {
	query?: string;
	reverse?: boolean;
	sortKey?: string;
}): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductsOperation>({
		query: getProductsQuery,
		tags: [TAGS.products],
		variables: {
			query,
			reverse,
			sortKey,
		},
	});

	return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export const getPreparedProducts = async () => {
	const products = await getProducts({});
	return {
		productPages: products.reduce((accumulator, currentValue) => {
			return Object.assign(accumulator, {
				[`${currentValue.handle}`]: {
					...currentValue,
				},
			});
		}, {}),
	};
};

export async function getWishlistProducts(): Promise<Product[]> {
	const res = await shopifyFetch<ShopifyProductsOperation>({
		query: getWishlistProductsQuery,
	});

	return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export const getPreparedWishlistProducts = async () => {
	const products = await getWishlistProducts();
	return {
		productPages: products.reduce((accumulator, currentValue) => {
			return Object.assign(accumulator, {
				[`${currentValue.handle}`]: {
					...currentValue,
				},
			});
		}, {}),
	};
};
