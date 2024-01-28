"use client";

import { useEffect, useRef } from "react";

import { Curtain } from "../Modal/Curtain";
// import { Empty } from "./Empty";
import { Content } from "./Content";

import type { CartProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";
import { useCartState } from "@/lib/zustand/cart";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive, wrapperExit } = styles;

export const Cart = ({ cart }: CartProps) => {
	const quantityRef = useRef(cart?.totalQuantity);

	const cartState = useCartState();

	useBlockScroll(cartState.isActive);

	useEffect(() => {
		// Open cart modal when quantity changes.
		if (cart?.totalQuantity !== quantityRef.current) {
			// But only if it's not already open (quantity also changes when editing items in cart).
			if (!cartState.isActive) {
				cartState.handleToggleCart();
			}

			// Always update the quantity reference
			quantityRef.current = cart?.totalQuantity;
		}
	}, [cart?.totalQuantity, quantityRef, cartState]);

	return (
		<>
			<Curtain
				show={cartState.isActive}
				onClose={cartState.handleToggleCart}
				curtainClose={true}
				curtainColor={"black"}
			/>
			<div className={cx(wrapper, cartState.isActive && wrapperActive)}>
				<div className={wrapperExit}>
					<button onClick={cartState.handleToggleCart} aria-label="Close">
						<Icons.CloseSVG />
					</button>
				</div>
				{!cart || cart.lines.length === 0 ? (
					<div>
						{/* <Empty
						description="You have not added any products yet."
						icon="https://cdn.shopify.com/s/files/1/0830/0819/2813/files/cart.webp?v=1698231283"
						title="Your cart is empty"
						saleProducts={saleProducts}
					/> */}
					</div>
				) : (
					<Content
						products={cart.lines}
						price={Number(cart.cost.subtotalAmount.amount)}
						checkoutUrl={cart.checkoutUrl}
					/>
				)}
			</div>
		</>
	);
};
