import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/shared/Spinner";

import type { AddToCartProps } from "./types";
import { useQuantity } from "@/lib/hooks/useQuantity";
import { Icons } from "@/lib";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { useWishListState } from "@/lib/zustand/wishlist";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";
import { addItem } from "@/lib/shopify/functions/cart/actions";
import { useOutOfStockNotificationStatePropsState } from "@/lib/zustand/outOfStockNotification";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperBlock,
	wrapperBlockQuantity,
	wrapperBlockQuantityLine,
	wrapperBlockWishlist,
	wrapperBlockWishlistInWishlist,
	wrapperBtn,
} = styles;

export const AddToCart = ({
	variants,
	id,
	quantityAvailable,
	currentVariantIsAvailableForSale,
}: AddToCartProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const zustand = useOutOfStockNotificationStatePropsState();
	const { quantity, decrementQuantity, incrementQuantity, quantityToColorHex } = useQuantity(id);

	const { addToWishList, variantIds, removeFromWishList, isAnimation } = useWishListState();

	const isVariantInWishlist = variants.some((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	);

	const variantIdInWishList = variants.find((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	)?.id!;

	useBlockScroll(isAnimation);

	return (
		<div className={wrapper}>
			<div className={wrapperBlock}>
				<div className={wrapperBlockQuantity}>
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
						className={wrapperBlockQuantityLine}
						style={{ backgroundColor: quantityToColorHex(quantity) }}
					/>
				</div>
				<button
					aria-label="Wishlist"
					id="heartWishlist"
					onClick={(e) =>
						isVariantInWishlist && !isAnimation
							? removeFromWishList(getNumberAfterLastSlash(variantIdInWishList))
							: addToWishList(getNumberAfterLastSlash(id), e, true)
					}
					className={cx(
						isVariantInWishlist && wrapperBlockWishlistInWishlist,
						wrapperBlockWishlist,
					)}
				>
					{isVariantInWishlist ? <Icons.HeartSVG /> : <Icons.WishlistSVG />}
				</button>
			</div>
			<div
				className={wrapperBtn}
				onClick={() => {
					currentVariantIsAvailableForSale &&
						startTransition(async () => {
							const error = await addItem(id, quantity);

							if (error) {
								throw new Error(error.toString());
							}

							router.refresh();
						});
					if (!currentVariantIsAvailableForSale) {
						zustand.addVariantId(getNumberAfterLastSlash(id));
						zustand.handleToggle();
					}
				}}
			>
				<button>
					{isPending ? (
						<Spinner />
					) : currentVariantIsAvailableForSale ? (
						"Add to cart"
					) : (
						"Out of stock - Notify me"
					)}
				</button>
			</div>
		</div>
	);
};
