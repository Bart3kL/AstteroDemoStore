import { productFragment } from "../fragments/product";

export const getProductQuery = /* GraphQL */ `
	query getProduct($handle: String!) {
		product(handle: $handle) {
			...product
		}
	}
	${productFragment}
`;

export const getProductsQuery = /* GraphQL */ `
	query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
		products(sortKey: $sortKey, reverse: $reverse, query: $query, first: 100) {
			edges {
				node {
					...product
				}
			}
		}
	}
	${productFragment}
`;
export const getWishlistProductsQuery = /* GraphQL */ `
	query {
		products(first: 100) {
			edges {
				node {
					handle

					title

					options {
						id
						name
						values
					}

					collections(first: 100) {
						edges {
							node {
								handle
								title

								subCollectionTitle: metafield(namespace: "custom", key: "sub_collection_title") {
									value
								}
							}
						}
					}
					variants(first: 250) {
						edges {
							node {
								id
								title
								availableForSale
								selectedOptions {
									name
									value
								}
								image {
									url
								}
								quantityAvailable
								compareAtPrice {
									amount
									currencyCode
								}
								price {
									amount
									currencyCode
								}
							}
						}
					}

					tags
					updatedAt
				}
			}
		}
	}
`;
