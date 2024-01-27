export const registerMutation = /* GraphQL */ `
	mutation customerCreate($input: CustomerCreateInput!) {
		customerCreate(input: $input) {
			customerUserErrors {
				code
				message
			}
		}
	}
`;

export const loginMutation = /* GraphQL */ `
	mutation SignInWithEmailAndPassword($email: String!, $password: String!) {
		customerAccessTokenCreate(input: { email: $email, password: $password }) {
			customerAccessToken {
				accessToken
				expiresAt
			}
			customerUserErrors {
				code
				message
			}
		}
	}
`;

export const resetPasswordMutation = /* GraphQL */ `
	mutation customerRecover($email: String!) {
		customerRecover(email: $email) {
			customerUserErrors {
				code
				message
			}
		}
	}
`;
export const addressMutation = /* GraphQL */ `
	mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
		customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
			customerAddress {
				id
				address1
				address2
				city
				firstName
				lastName
				country
				phone
				province
				zip
			}
			customerUserErrors {
				code
				message
			}
		}
	}
`;

export const setDefaultAddressMutation = /* GraphQL */ `
	mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
		customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
			customerUserErrors {
				code
				message
			}
		}
	}
`;

export const deleteAddressMutation = /* GraphQL */ `
	mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
		customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
			customerUserErrors {
				code
				message
			}
			deletedCustomerAddressId
		}
	}
`;

export const updateAddressMutation = /* GraphQL */ `
	mutation customerAddressUpdate(
		$address: MailingAddressInput!
		$customerAccessToken: String!
		$id: ID!
	) {
		customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
			customerUserErrors {
				code
				message
			}
		}
	}
`;
