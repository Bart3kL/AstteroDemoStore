import { useTransition } from "react";
import { useRouter } from "next/navigation";

import type { ActionsPanelProps } from "./types";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { Icons } from "@/lib";
import { useQuantity } from "@/lib/hooks/useQuantity";
import { addItem } from "@/lib/shopify/functions/cart/actions";
import { useOutOfStockNotificationStatePropsState } from "@/lib/zustand/outOfStockNotification";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperQuantity,
	wrapperQuantityAddToCart,
	wrapperQuantitySoldOut,
	wrapperTrash,
} = styles;

export const ActionsPanel = ({
	showOptions,
	removeFromWishList,
	handleDeleteSignleProductFromWishlist,
	handleToggle,
	currentVariantId,
	quantityAvailable,
	currentVariantIsAvailableForSale,
}: ActionsPanelProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const zustand = useOutOfStockNotificationStatePropsState();
	const { quantity, decrementQuantity, incrementQuantity } = useQuantity(currentVariantId);

	return (
		<div className={cx(wrapper, showOptions && wrapperActive)}>
			<div className={wrapperQuantity}>
				<div>
					<button onClick={decrementQuantity} aria-label="Decrement">
						<Icons.MinusSVG />
					</button>
					<p>{quantityAvailable === 0 ? 0 : quantity}</p>
					{quantityAvailable > quantity ? (
						<button onClick={incrementQuantity} aria-label="Increment">
							<Icons.PlusSVG />
						</button>
					) : (
						<button aria-label="Block">
							<Icons.ExitSVG />
						</button>
					)}
				</div>
				{currentVariantIsAvailableForSale ? (
					<button
						aria-label="Buy"
						className={wrapperQuantityAddToCart}
						onClick={() => {
							startTransition(async () => {
								const error = await addItem(currentVariantId, quantity);

								if (error) {
									throw new Error(error.toString());
								}

								router.refresh();
								handleToggle();
							});
							if (!currentVariantIsAvailableForSale) {
								zustand.addVariantId(getNumberAfterLastSlash(currentVariantId));
								zustand.handleToggle();
							}
						}}
					>
						{isPending ? <Icons.LoadingDotsSVG /> : <Icons.ShopSVG />}
					</button>
				) : (
					<button className={wrapperQuantitySoldOut}>Sold out</button>
				)}
			</div>
			<div
				className={wrapperTrash}
				onClick={() => {
					removeFromWishList();
					handleDeleteSignleProductFromWishlist();
				}}
			>
				<Icons.TrashSVG />
			</div>
		</div>
	);
};
