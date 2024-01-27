import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Icons } from "@/lib";
import { quantityToColorHex } from "./utils";
import { updateItemQuantity, removeItem } from "@/lib/shopify/functions/cart/actions";

import styles from "./rwd.module.scss";
const { wrapper, wrapperLine } = styles;

export const Quantity = ({ quantity, lineId, merchandiseId, quantityAvailable }: any) => {
	const router = useRouter();
	const [isPendingMinus, startTransitionMinus] = useTransition();
	const [isPendingPlus, startTransitionPlus] = useTransition();
	return (
		<div className={wrapper}>
			<div>
				<button
					aria-label="Loading or decrement"
					onClick={() => {
						startTransitionMinus(async () => {
							const error =
								quantity - 1 === 0
									? await removeItem(lineId)
									: await updateItemQuantity({
											lineId: lineId,
											variantId: merchandiseId,
											quantity: quantity - 1,
									  });

							if (error) {
								throw new Error(error.toString());
							}

							router.refresh();
						});
					}}
					disabled={isPendingMinus}
				>
					{isPendingMinus ? <Icons.LoadingDotsSVG /> : <Icons.MinusSVG />}
				</button>

				<p>{quantity}</p>

				<button
					aria-label="Loading or increment"
					onClick={() => {
						quantityAvailable > quantity &&
							startTransitionPlus(async () => {
								const error = await updateItemQuantity({
									lineId: lineId,
									variantId: merchandiseId,
									quantity: quantity + 1,
								});

								if (error) {
									throw new Error(error.toString());
								}

								router.refresh();
							});
					}}
					disabled={isPendingPlus}
				>
					{isPendingPlus ? (
						<Icons.LoadingDotsSVG />
					) : quantityAvailable > quantity ? (
						<Icons.PlusSVG />
					) : (
						<Icons.ExitSVG />
					)}
				</button>
			</div>
			<div className={wrapperLine} style={{ backgroundColor: quantityToColorHex(quantity) }} />
		</div>
	);
};
