import { imageFragment } from "./image";
import { seoFragment } from "./seo";
// import { metafieldFragment } from "./metafield";

export const productFragment = /* GraphQL */ `
	fragment product on Product {
		id
		handle
		availableForSale
		title
		description
		descriptionHtml
		createdAt
		options {
			id
			name
			values
		}
		priceRange {
			maxVariantPrice {
				amount
				currencyCode
			}
			minVariantPrice {
				amount
				currencyCode
			}
		}
		customersAlsoPurchased: metafield(namespace: "custom", key: "customers_also_purchased") {
			references(first: 20) {
				edges {
					node {
						... on Product {
							id
						}
					}
				}
			}
		}
		brand: metafield(namespace: "custom", key: "brand") {
			value
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
					bundleImage: metafield(namespace: "custom", key: "bundle_image") {
						reference {
							... on MediaImage {
								image {
									url
									altText
								}
							}
						}
					}
				}
			}
		}
		featuredImage {
			...image
		}
		images(first: 20) {
			edges {
				node {
					...image
				}
			}
		}
		seo {
			...seo
		}
		tags
		updatedAt
	}
	${imageFragment}
	${seoFragment}
`;
