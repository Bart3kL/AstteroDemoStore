import { cookies } from "next/headers";

import { Header } from "@/components/shared/Header";

import type { HeaderProps } from "./types";
import { getHeaderQuery } from "@/lib/contentful/queries/shared/index";
import { fetchGraphQL } from "@/lib/contentful";
import { getCart } from "@/lib/shopify/functions/cart/cart";

export const HeaderSection = async ({ subCollections, products }: HeaderProps) => {
	const { shared } = await fetchGraphQL({ query: getHeaderQuery });
	const cartId = cookies().get("cartId")?.value;
	let cart;

	if (cartId) {
		cart = await getCart(cartId);
	}

	return (
		<Header
			announcementBarCache={shared.header.announcementBarCache}
			preparedProducts={products}
			headerData={shared.header.headerData}
			subCollections={subCollections}
			cartQuantity={cart?.lines.length ?? 0}
		/>
	);
};
