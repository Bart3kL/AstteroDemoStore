import { changeToFastImage } from "../utils";

import { HIDDEN_PRODUCT_TAG } from "./constants";
import type { ShopifyProduct, Image } from "./functions/product/types";
import type { Connection } from "./types";

export const reshapeProducts = (products: ShopifyProduct[]) => {
	const reshapedProducts = [];

	for (const product of products) {
		if (product) {
			const reshapedProduct = reshapeProduct(product);

			if (reshapedProduct) {
				reshapedProducts.push(reshapedProduct);
			}
		}
	}

	return reshapedProducts;
};
export const removeEdgesAndNodes = (array: Connection<any>) => {
	return array.edges.map((edge) => edge?.node);
};
export const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
	if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
		return undefined;
	}

	const { images, variants, title, collections, customersAlsoPurchased, ...rest } = product;
	const breadCrumbs = [
		{ title: "Home", handle: "/" },
		...removeEdgesAndNodes(collections).slice(0, 2),
		{ title: title },
	].map((breadCrumb, idx) => ({
		title: breadCrumb.subCollectionTitle ? breadCrumb.subCollectionTitle.value : breadCrumb.title,
		handle: idx === 1 || idx === 2 ? `/collections/${breadCrumb.handle}` : breadCrumb.handle,
	}));

	const customersAlsoPurchasedProductIds = customersAlsoPurchased
		? removeEdgesAndNodes(customersAlsoPurchased.references).map((product) => product.id)
		: [];

	const reshapredVariants = variants ? removeEdgesAndNodes(variants) : [];

	return {
		...rest,
		title,
		customersAlsoPurchased: customersAlsoPurchasedProductIds,
		collection: removeEdgesAndNodes(collections)[0],
		images: images ? reshapeImages(images, product.title) : [],
		variants: reshapredVariants.map((variant) => ({
			...variant,
			imageSmall: {
				url: variant.image.url && changeToFastImage(variant.image.url, 400, 450),
			},
			imageMini: {
				url: variant.image.url && changeToFastImage(variant.image.url, 150, 200),
			},

			bundleImage: variant.bundleImage
				? changeToFastImage(variant.bundleImage.reference.image.url, 150, 200)
				: null,
		})),
		rating: {
			stars: Math.random() < 0.33 ? 4 : Math.random() < 0.5 ? 4.5 : 5,
			amount: Math.floor(Math.random() * 146) + 5,
		},
		breadCrumbs,
	};
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
	const flattened = removeEdgesAndNodes(images);

	return flattened.map((image) => {
		const filename = image.url.match(/.*\/(.*)\..*/)[1];
		return {
			...image,
			altText: image.altText || `${productTitle} - ${filename}`,
		};
	});
};
