"use server";

import { cookies } from "next/headers";

import type { ProductWishList, Product } from "@/lib/shopify/functions/product/types";

import { getNumberAfterLastSlash } from "@/lib/utils";

export const getProductsToWishlist = async ({
	products,
}: {
	products: Product[];
}): Promise<ProductWishList[]> => {
	const cookieStore = cookies();
	const variantIds = cookieStore.get("variantIds")?.value.split(",") ?? [];

	const productsInWishlist = products
		.filter((product) => {
			return variantIds.some((variantId) => {
				return product.variants.some(
					(variant) => getNumberAfterLastSlash(variant.id) === variantId,
				);
			});
		})
		.map((product) => ({
			...product,
			variantInWishlist: product.variants.filter((variant) =>
				variantIds.includes(getNumberAfterLastSlash(variant.id)),
			)[0],
		})) as ProductWishList[];

	return productsInWishlist;
};
