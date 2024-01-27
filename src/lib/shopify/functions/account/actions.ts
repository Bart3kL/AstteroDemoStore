"use server";

import { cookies } from "next/headers";

import {
	registerMutation,
	loginMutation,
	// resetPasswordMutation
	addressMutation,
	setDefaultAddressMutation,
	deleteAddressMutation,
	updateAddressMutation,
} from "../../mutations/account";
import { removeEdgesAndNodes } from "../../utils";

import { getCustomerQuery } from "../../queries/account";
import type {
	ShopifyRegisterOperation,
	ShopifyLoginOperation,
	ShopifyCustomerOperation,
	ShopifyCustomerAddressOperation,
	AddressProps,
	ShopifyCustomerSetDefaultAddressOperation,
	ShopifyCustomerDeleteAddressOperation,
	ShopifyCustomerUpdateAddressOperation,
} from "./types";
import { shopifyFetch } from "../../index";

export async function register(input: ShopifyRegisterOperation["variables"]["input"]) {
	const res = await shopifyFetch<ShopifyRegisterOperation>({
		query: registerMutation,
		cache: "no-store",
		variables: {
			input,
		},
	});

	return res;
}

export async function login(email: string, password: string) {
	const res = await shopifyFetch<ShopifyLoginOperation>({
		query: loginMutation,
		cache: "no-store",
		variables: {
			email,
			password,
		},
	});
	const expirationDate = new Date();
	expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);

	if (res.body.data.customerAccessTokenCreate.customerAccessToken) {
		cookies().set(
			"userAccessToken",
			res.body.data.customerAccessTokenCreate.customerAccessToken.accessToken,
			{ expires: expirationDate },
		);
	}

	return { data: res.body, status: res.status };
}

export async function getCustomer(customerAccessToken: string) {
	const res = await shopifyFetch<ShopifyCustomerOperation>({
		query: getCustomerQuery,
		cache: "no-store",
		variables: {
			customerAccessToken,
		},
	});

	return {
		...res.body.data.customer,
		addresses: removeEdgesAndNodes(res.body.data.customer.addresses),
	};
}

export async function createCustomerAddress(address: AddressProps) {
	const customerAccessToken = cookies().get("userAccessToken")!.value;

	const res = await shopifyFetch<ShopifyCustomerAddressOperation>({
		query: addressMutation,
		cache: "no-store",
		variables: {
			customerAccessToken,
			address,
		},
	});

	const addressId = res.body.data.customerAddressCreate.customerAddress.id;
	await setDefaultCustomerAddress(addressId);
	return res.body;
}
export async function setDefaultCustomerAddress(addressId: string) {
	const customerAccessToken = cookies().get("userAccessToken")!.value;

	await shopifyFetch<ShopifyCustomerSetDefaultAddressOperation>({
		query: setDefaultAddressMutation,
		cache: "no-store",
		variables: {
			customerAccessToken,
			addressId,
		},
	});
}
export async function deleteCustomerAddress(addressId: string) {
	const customerAccessToken = cookies().get("userAccessToken")!.value;

	await shopifyFetch<ShopifyCustomerDeleteAddressOperation>({
		query: deleteAddressMutation,
		cache: "no-store",
		variables: {
			customerAccessToken,
			id: addressId,
		},
	});
}
export async function updateCustomerAddress(addressId: string, address: AddressProps) {
	const customerAccessToken = cookies().get("userAccessToken")!.value;

	await shopifyFetch<ShopifyCustomerUpdateAddressOperation>({
		query: updateAddressMutation,
		cache: "no-store",
		variables: {
			address,
			customerAccessToken,
			id: addressId,
		},
	});
}

// export async function resetPasswordMutation(email: string, password: string) {
// 	const res = await shopifyFetch<ShopifyLoginOperation>({
// 		query: loginMutation,
// 		cache: "no-store",
// 		variables: {
// 			email,
// 			password,
// 		},
// 	});
// 	const expirationDate = new Date();
// 	expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);

// 	if (res.body.data.customerAccessTokenCreate.customerAccessToken) {
// 		cookies().set(
// 			"userAccessToken",
// 			res.body.data.customerAccessTokenCreate.customerAccessToken.accessToken,
// 			{ expires: expirationDate },
// 		);
// 	}

// 	return { data: res.body, status: res.status };
// }
