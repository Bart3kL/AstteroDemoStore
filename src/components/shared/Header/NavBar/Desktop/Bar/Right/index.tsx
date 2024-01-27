import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { ChatPopup } from "../../../shared/ChatPopup";
import { Search } from "../../../shared/Search";
import { Portal } from "../../../../../Modal/Portal";
import { Curtain } from "../../../../../Modal/Curtain";

import type { RightProps } from "./types";
import { Icons } from "@/lib";
import { useWindowWidth } from "@/lib/hooks/useWindowWidth";
import { useModal } from "@/lib/hooks/useModal";
import { cx } from "@/lib/utils";
import { useWishListState } from "@/lib/zustand/wishlist";
import { useCartState } from "@/lib/zustand/cart";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperItem,
	wrapperItemWishListIsNotEmpty,
	wrapperItemWishList,
	wrapperItemCartIsNotEmpty,
	wrapperBlackIcons,
} = styles;

export const Right = ({
	chatData,
	searchData,
	preparedProducts,
	changeHeaderBackground,
	isNotHomePage,
	cartQuantity,
}: RightProps) => {
	const { isActive, handleClose, handleOpen, modalAddRef, type } = useModal();
	const { handleToggle, variantIds, isAnimation } = useWishListState();
	const cartState = useCartState();

	const [currentLength, setCurrentLength] = useState(variantIds.length);

	useEffect(() => {
		if (!isAnimation) {
			setCurrentLength(variantIds.length);
		}
	}, [isAnimation, variantIds.length]);

	const width = useWindowWidth();
	const isDesktop = width >= 1024;

	const searchParams = useSearchParams();

	const search = searchParams.get("search");

	useEffect(() => {
		if (search) {
			handleOpen("search");
		}
	}, [search, handleOpen]);

	return (
		<>
			<div className={cx(wrapper, (changeHeaderBackground || isNotHomePage) && wrapperBlackIcons)}>
				<Curtain
					show={isAnimation}
					onClose={() => !isAnimation && handleToggle()}
					curtainClose={true}
					curtainColor={"black"}
				/>
				<div className={wrapperItem}>
					{isActive && type === "chat" ? (
						<p onClick={() => handleClose()}>
							<Icons.ExitSVG />
						</p>
					) : (
						<p onClick={() => handleOpen("chat")}>
							<Icons.ChatSVG />
						</p>
					)}
				</div>

				<div className={wrapperItem}>
					{isActive && type === "search" ? (
						<p onClick={() => handleClose()}>
							<Icons.ExitSVG />
						</p>
					) : (
						<p onClick={() => handleOpen("search")}>
							<Icons.SearchSVG />
						</p>
					)}
				</div>
				<Link className={wrapperItem} href="/account/login" aria-label="Redirection to login page">
					<Icons.AccountSVG />
				</Link>
				<div
					onClick={handleToggle}
					className={cx(
						wrapperItem,
						isAnimation && wrapperItemWishList,
						variantIds.length > 0 && currentLength > 0 && wrapperItemWishListIsNotEmpty,
					)}
				>
					<div id="cartCircleDesktop">
						{variantIds.length > 0 && currentLength > 0 ? (
							<Icons.HeartSVG />
						) : (
							<Icons.WishlistSVG />
						)}
						{variantIds.length > 0 && currentLength > 0 && <span>{currentLength}</span>}
					</div>
				</div>
				<p
					className={cx(wrapperItem, cartQuantity > 0 && wrapperItemCartIsNotEmpty)}
					onClick={cartState.handleToggleCart}
				>
					<Icons.CartSVG />
					{cartQuantity > 0 && <span>{cartQuantity}</span>}
				</p>
			</div>

			<ChatPopup
				isActive={isActive && type === "chat" ? true : false}
				modalAddRef={modalAddRef}
				{...chatData}
			/>

			<Portal>
				{isDesktop && (
					<>
						<Curtain
							show={isActive && type === "search" ? true : false}
							onClose={() => {}}
							curtainClose={false}
							curtainColor={"black"}
						/>
						<Search
							isActive={isActive && type === "search" ? true : false}
							modalAddRef={modalAddRef}
							preparedProducts={preparedProducts}
							searchData={searchData}
						/>
					</>
				)}
			</Portal>
		</>
	);
};
