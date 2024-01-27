import type { ShopifyCollectionsOperation } from "./types";
import { TAGS } from "../../constants";
import { getCollectionsQuery } from "../../queries/collection";
import { removeEdgesAndNodes } from "../../utils";
import { shopifyFetch } from "../..";

export async function getCollections(): Promise<any> {
	const res = await shopifyFetch<ShopifyCollectionsOperation>({
		query: getCollectionsQuery,
		tags: [TAGS.collections, TAGS.products],
	});

	return removeEdgesAndNodes(res.body.data.collections).map((collection) => ({
		...collection,
		products: removeEdgesAndNodes(collection.products).map((product) => product.id),
		bannerImage: collection.bannerImage.reference.image,
		subCollections: collection.subCollections
			? removeEdgesAndNodes(collection.subCollections.references).map((subCollection) => ({
					handle: `/collections/${subCollection.handle}`,
					title: subCollection.subCollectionTitle.value,
			  }))
			: [],
	}));
}
