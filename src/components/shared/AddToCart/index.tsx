import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/shared/Spinner";

import type { AddToCartProps } from "./types";
import { useQuantity } from "@/lib/hooks/useQuantity";
import { Icons } from "@/lib";
import { getNumberAfterLastSlash } from "@/lib/utils";
import { addItem, addItems } from "@/lib/shopify/functions/cart/actions";
import { useOutOfStockNotificationStatePropsState } from "@/lib/zustand/outOfStockNotification";

import styles from "./rwd.module.scss";
const { wrapper, wrapperQuantity, wrapperQuantityLine, wrapperBtn } = styles;

export const AddToCart = ({
	isBundle,
	setConfirmationModal,
	currentVariantId,
	hideModal,
	quantityAvailable,
	currentVariantIsAvailableForSale,
	bundleProductsAddToCart,
}: AddToCartProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isPendingBundle, startTransitionBundle] = useTransition();

	const { quantity, decrementQuantity, incrementQuantity, quantityToColorHex } =
		useQuantity(currentVariantId);
	const zustand = useOutOfStockNotificationStatePropsState();

	return (
		<div className={wrapper}>
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
				<div
					className={wrapperQuantityLine}
					style={{ backgroundColor: quantityToColorHex(quantity) }}
				/>
			</div>
			<div className={wrapperBtn}>
				{isBundle ? (
					<button
						onClick={() => {
							bundleProductsAddToCart &&
								startTransitionBundle(async () => {
									const error = await addItems(bundleProductsAddToCart);

									if (error) {
										throw new Error(error.toString());
									}

									router.refresh();
									if (hideModal) {
										hideModal();
									}
								});
						}}
					>
						{isPendingBundle ? <Spinner /> : "Add bundle to cart"}
					</button>
				) : (
					<button
						onClick={() => {
							currentVariantIsAvailableForSale &&
								startTransition(async () => {
									const error = await addItem(currentVariantId, quantity);

									if (error) {
										throw new Error(error.toString());
									}

									router.refresh();
									if (hideModal) {
										hideModal();
									}
								});

							if (!currentVariantIsAvailableForSale) {
								zustand.addVariantId(getNumberAfterLastSlash(currentVariantId));
								zustand.handleToggle();
							}
						}}
					>
						{isPending ? (
							<Spinner />
						) : currentVariantIsAvailableForSale ? (
							"ADD TO CART"
						) : (
							"OUT OF STOCK - NOTIFY ME"
						)}
					</button>
				)}
				{isBundle && (
					<button
						onClick={() => {
							currentVariantIsAvailableForSale &&
								setConfirmationModal &&
								setConfirmationModal(true);

							if (!currentVariantIsAvailableForSale) {
								zustand.addVariantId(getNumberAfterLastSlash(currentVariantId));
								zustand.handleToggle();
							}
						}}
					>
						{isPending ? (
							<Spinner />
						) : currentVariantIsAvailableForSale ? (
							"Add only this product"
						) : (
							"Out of stock - Notify me"
						)}
					</button>
				)}
			</div>
		</div>
	);
};
