import { isShopifyError } from "./type-guards";

type ExtractVariables<T> = T extends { variables: object } ? T["variables"] : never;

export async function shopifyFetch<T>({
	cache = "force-cache",
	headers,
	query,
	tags,
	variables,
	admin,
}: {
	cache?: RequestCache;
	headers?: HeadersInit;
	query: string;
	tags?: string[];
	variables?: ExtractVariables<T>;
	admin?: boolean;
}): Promise<{ status: number; body: T } | never> {
	const url = admin ? process.env.SHOPIFY_STORE_ADMIN_DOMAIN! : process.env.SHOPIFY_STORE_DOMAIN!;
	try {
		const result = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
				"X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
				...headers,
			},
			body: JSON.stringify({
				...(query && { query }),
				...(variables && { variables }),
			}),
			cache,
			...(tags && { next: { tags } }),
		});

		const body = await result.json();

		if (body.errors) {
			throw body.errors[0];
		}

		return {
			status: result.status,
			body,
		};
	} catch (e) {
		if (isShopifyError(e)) {
			throw {
				cause: e.cause?.toString() || "unknown",
				status: e.status || 500,
				message: e.message,
				query,
			};
		}

		throw {
			error: e,
			query,
		};
	}
}
