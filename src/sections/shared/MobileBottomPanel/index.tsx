import { cookies } from "next/headers";

import { MobileBottomPanel } from "@/components/shared/MobileBottomPanel";

import { getCart } from "@/lib/shopify/functions/cart/cart";

export const MobileBottomPanelSection = async () => {
	const cartId = cookies().get("cartId")?.value;
	let cart;

	if (cartId) {
		cart = await getCart(cartId);
	}

	return <MobileBottomPanel cartQuantity={cart?.lines.length ?? 0} />;
};
