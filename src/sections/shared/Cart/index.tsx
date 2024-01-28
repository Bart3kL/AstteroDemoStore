import { cookies } from "next/headers";

import { Cart } from "@/components/shared/Cart";

import type { CartSectionProps } from "./types";
import { getCart } from "@/lib/shopify/functions/cart/cart";

export const CartSection = async ({ products }: CartSectionProps) => {
	const cartId = cookies().get("cartId")?.value;
	let cart;

	if (cartId) {
		cart = await getCart(cartId);
	}

	const saleProducts =
		products &&
		products
			.filter(
				(product) =>
					Number(product.variants[0].compareAtPrice?.amount) >
					Number(product.variants[0].price.amount),
			)
			.slice(0, 6)
			.filter((product) => product.handle !== "satin-padded-jacket");

	return (
		<section>
			<Cart cart={cart} saleProducts={saleProducts} />
		</section>
	);
};
