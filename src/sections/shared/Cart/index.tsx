import { cookies } from "next/headers";

import { Cart } from "@/components/shared/Cart";

import { getCart } from "@/lib/shopify/functions/cart/cart";

export const CartSection = async () => {
	const cartId = cookies().get("cartId")?.value;
	let cart;

	if (cartId) {
		cart = await getCart(cartId);
	}

	return (
		<section>
			<Cart cart={cart} />
		</section>
	);
};
