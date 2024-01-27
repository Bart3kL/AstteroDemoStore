/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";

import { Curtain } from "../Modal/Curtain";
import { Empty } from "./Empty";
import { Modal } from "./Modal";
import { AnimationConsent } from "./AnimationConsent";

import type { WishListSectionProps } from "@/sections/shared/WishList/types";
import type { Product, ProductWishList } from "@/lib/shopify/functions/product/types";
import { getProductsToWishlist } from "./utils";
import { Icons } from "@/lib";
import { useWishListState } from "@/lib/zustand/wishlist";
import { cx } from "@/lib/utils";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";

import styles from "./rwd.module.scss";

const { wrapper, wrapperActive, wrapperExit } = styles;

export const WishList = ({
	wishlistData,
	allProducts,
}: {
	wishlistData: WishListSectionProps["wishlist"];
	allProducts: Product[];
}) => {
	const [isClient, setIsClient] = useState(false);
	const { handleToggle, isActive, addToWishList, removeFromWishList, variantIds, isAnimation } =
		useWishListState();

	useBlockScroll(isActive);

	const [products, setProducts] = useState<ProductWishList[]>([]);
	const fetchData = async () => {
		const data = await getProductsToWishlist({ products: allProducts });

		setProducts(data);
	};

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (isActive) {
			fetchData();
		}
	}, [isActive]);

	const [showAnimationConsent, setShowAnimationConsent] = useState(false);

	const isAnimationConsentInCookies =
		isClient && document.cookie.includes("disallowWishlistAnimation");

	useEffect(() => {
		if (!isAnimation && variantIds.length > 0) {
			setShowAnimationConsent(true);
		}
	}, [variantIds, isAnimation]);

	return (
		<>
			{!isAnimationConsentInCookies && (
				<AnimationConsent
					showAnimationConsent={showAnimationConsent}
					setShowAnimationConsent={setShowAnimationConsent}
				/>
			)}
			<Curtain show={isActive} onClose={handleToggle} curtainClose={true} curtainColor={"black"} />
			<div className={cx(wrapper, isActive && wrapperActive)}>
				<div className={wrapperExit}>
					<button onClick={handleToggle} aria-label="Close">
						<Icons.CloseSVG />
					</button>
				</div>
				{products.length === 0 ? (
					<Empty {...wishlistData.empty} />
				) : (
					<Modal
						products={products}
						addToWishList={addToWishList}
						removeFromWishList={removeFromWishList}
						setProducts={setProducts}
						{...wishlistData.products}
						handleToggle={handleToggle}
					/>
				)}
			</div>
		</>
	);
};
