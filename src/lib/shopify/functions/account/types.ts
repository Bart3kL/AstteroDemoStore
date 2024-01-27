export type ShopifyRegisterOperation = {
	variables: {
		input: {
			email: string;
			password: string;
			firstName: string;
			lastName: string;
		};
	};
};
export type ShopifyLoginOperation = {
	data: {
		customerAccessTokenCreate: {
			customerAccessToken: {
				accessToken: string;
				expiresAt: string;
			};
		};
		status: number;
	};
	variables: {
		email: string;
		password: string;
	};
};
export type ShopifyCustomerOperation = {
	data: {
		customer: {
			id: string;
			firstName: string;
			lastName: string;
			email: string;
			addresses: {
				edges: {
					node: AddressProps;
				}[];
			};
			defaultAddress: {
				id: string;
			};
		};
	};
	variables: {
		customerAccessToken: string;
	};
};
export type ShopifyCustomerAddressOperation = {
	data: {
		customerAddressCreate: {
			customerAddress: {
				id: string;
			};
		};
	};
	variables: {
		customerAccessToken: string;
		address: AddressProps;
	};
};
export type ShopifyCustomerSetDefaultAddressOperation = {
	variables: {
		customerAccessToken: string;
		addressId: string;
	};
};
export type ShopifyCustomerDeleteAddressOperation = {
	variables: {
		customerAccessToken: string;
		id: string;
	};
};
export type ShopifyCustomerUpdateAddressOperation = {
	variables: {
		customerAccessToken: string;
		id: string;
		address: AddressProps;
	};
};

export type AddressProps = {
	address1: string;
	address2: string;
	city: string;
	country: string;
	firstName: string;
	lastName: string;
	phone?: string;
	province: string;
	zip: string;
};
