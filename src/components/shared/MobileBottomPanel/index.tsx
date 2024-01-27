"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Curtain } from "../Modal/Curtain";

import type { MobileBottomPanelProps } from "./types";
import { Icons } from "@/lib";
import { useMobileBottomPanel } from "./hooks";
import { cx } from "@/lib/utils";
import { useWishListState } from "@/lib/zustand/wishlist";
import { useCartState } from "@/lib/zustand/cart";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperShown,
	wrapperContent,
	wrapperContentItem,
	wrapperContentItemWishList,
	wrapperContentItemWishListIsNotEmpty,
	wrapperContentItemCartIsNotEmpty,
} = styles;

export const MobileBottomPanel = ({ cartQuantity }: MobileBottomPanelProps) => {
	const { isShown } = useMobileBottomPanel();
	const { handleToggle, variantIds, isAnimation } = useWishListState();
	const cartState = useCartState();

	const [currentLength, setCurrentLength] = useState(variantIds.length);

	useEffect(() => {
		if (!isAnimation) {
			setCurrentLength(variantIds.length);
		}
	}, [isAnimation, variantIds.length]);

	return (
		<section className={cx(wrapper, isShown && wrapperShown)}>
			<Curtain
				show={isAnimation}
				onClose={() => !isAnimation && handleToggle()}
				curtainClose={true}
				curtainColor={"black"}
			/>
			<div className={wrapperContent}>
				<Link className={wrapperContentItem} href="/">
					<Icons.HomeSVG />
					<p>Home</p>
				</Link>
				<div className={wrapperContentItem}>
					<Icons.CatalogSVG />
					<p>Catalog</p>
				</div>
				<Link className={wrapperContentItem} href="/account/login">
					<Icons.AccountSVG />
					<p>Account</p>
				</Link>
				<div
					className={cx(
						wrapperContentItem,
						isAnimation && wrapperContentItemWishList,
						variantIds.length > 0 && currentLength > 0 && wrapperContentItemWishListIsNotEmpty,
					)}
					onClick={handleToggle}
				>
					<p id="cartCircle">
						{variantIds.length > 0 && currentLength > 0 ? (
							<Icons.HeartSVG />
						) : (
							<Icons.WishlistSVG />
						)}
						{variantIds.length > 0 && currentLength > 0 && <span>{currentLength}</span>}
					</p>
					<p>Wishlist</p>
				</div>
				<div
					className={cx(wrapperContentItem, cartQuantity > 0 && wrapperContentItemCartIsNotEmpty)}
					onClick={cartState.handleToggleCart}
				>
					<Icons.CartSVG />
					<p>
						Cart
						{cartQuantity > 0 && <span>{cartQuantity}</span>}
					</p>
				</div>
			</div>
		</section>
	);
};
