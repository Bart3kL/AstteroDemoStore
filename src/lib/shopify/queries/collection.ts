export const getCollectionsQuery = /* GraphQL */ `
	query {
		collections(first: 100) {
			edges {
				node {
					handle
					title
					description
					subCollections: metafield(namespace: "custom", key: "sub_collections") {
						references(first: 20) {
							edges {
								node {
									... on Collection {
										handle
										subCollectionTitle: metafield(
											namespace: "custom"
											key: "sub_collection_title"
										) {
											value
										}
									}
								}
							}
						}
					}

					bannerImage: metafield(namespace: "custom", key: "banner") {
						reference {
							... on MediaImage {
								image {
									url
									altText
								}
							}
						}
					}
					products(first: 100) {
						edges {
							node {
								id
							}
						}
					}
				}
			}
		}
	}
`;

export const getCollectionProductsCountQuery = /* GraphQL */ `
	query getCollectionProducts($query: String!) {
		collections(first: 100, query: $query) {
			edges {
				node {
					productsCount
					handle
					image {
						url
					}
					title
				}
			}
		}
	}
`;
