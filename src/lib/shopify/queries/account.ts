export const getCustomerQuery = /* GraphQL */ `
	query getCustomer($customerAccessToken: String!) {
		customer(customerAccessToken: $customerAccessToken) {
			email
			id
			firstName
			lastName
			defaultAddress {
				id
			}
			addresses(first: 100) {
				edges {
					node {
						id
						address1
						address2
						city
						country
						firstName
						lastName
						zip
						province
						phone
					}
				}
			}
			orders(first: 100) {
				edges {
					node {
						orderNumber
						name
						cancelReason
						currentTotalPrice {
							amount
						}
						shippingAddress {
							address1
							address2
							city
							province
							country
							zip
							name
						}
						totalShippingPrice {
							amount
						}
						fulfillmentStatus
						subtotalPrice {
							amount
						}
						processedAt
						lineItems(first: 100) {
							edges {
								node {
									originalTotalPrice {
										amount
									}
									customAttributes {
										key
										value
									}
									quantity
									variant {
										sellingPlanAllocations(first: 2) {
											edges {
												node {
													sellingPlan {
														id
														name
													}
												}
											}
										}
										id
										image {
											url
											altText
										}
										product {
											title
										}
										title
										price {
											amount
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;
