"use server";

import { cookies } from "next/headers";

import type { ProductWishList } from "@/lib/shopify/functions/product/types";

import { getPreparedProducts } from "@/lib/shopify/functions/product/products";

import { getNumberAfterLastSlash, objectToArray } from "@/lib/utils";

export const getProductsToWishlist = async ({}): Promise<ProductWishList[]> => {
	const preparedProducts = await getPreparedProducts();

	const products = objectToArray(preparedProducts.productPages);

	const cookieStore = cookies();
	const variantIds = cookieStore.get("variantIds")?.value.split(",") ?? [];

	const productsInWishlist = products
		.filter((product) => {
			return variantIds.some((variantId) => {
				return product.variants.some(
					(variant: any) => getNumberAfterLastSlash(variant.id) === variantId,
				);
			});
		})
		.map((product) => ({
			...product,
			variantInWishlist: product.variants.filter((variant: any) =>
				variantIds.includes(getNumberAfterLastSlash(variant.id)),
			)[0],
		})) as ProductWishList[];

	return productsInWishlist;
};
