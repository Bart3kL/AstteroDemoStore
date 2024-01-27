import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/shared/Spinner";

import type { AddToCartProps } from "./types";
import { useQuantity } from "@/lib/hooks/useQuantity";
import { Icons } from "@/lib";
import { getNumberAfterLastSlash } from "@/lib/utils";
import { addItem } from "@/lib/shopify/functions/cart/actions";
import { useOutOfStockNotificationStatePropsState } from "@/lib/zustand/outOfStockNotification";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperBlock,
	wrapperBlockQuantity,
	wrapperBlockQuantityLine,

	wrapperBtn,
} = styles;

export const AddToCart = ({
	currentVariantId,
	quantityAvailable,
	currentVariantIsAvailableForSale,
}: AddToCartProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const zustand = useOutOfStockNotificationStatePropsState();
	const { quantity, decrementQuantity, incrementQuantity, quantityToColorHex } =
		useQuantity(currentVariantId);

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
			</div>
			<div className={wrapperBtn}>
				<button
					onClick={() => {
						currentVariantIsAvailableForSale &&
							startTransition(async () => {
								const error = await addItem(currentVariantId, quantity);

								if (error) {
									throw new Error(error.toString());
								}

								router.refresh();
							});
						if (!currentVariantIsAvailableForSale) {
							zustand.addVariantId(getNumberAfterLastSlash(currentVariantId));
							zustand.handleToggle();
						}
					}}
				>
					{isPending ? <Spinner /> : currentVariantIsAvailableForSale ? "ADD" : "SOLD OUT"}
				</button>
			</div>
		</div>
	);
};
