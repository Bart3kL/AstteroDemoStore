import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Curtain } from "../../../../shared/Modal/Curtain";

import type { ConfrimationModalProps } from "./types";
import { Icons } from "@/lib";
import { addItem, addItems } from "@/lib/shopify/functions/cart/actions";

import { Spinner } from "@/components/shared/Spinner";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent, wrapperContentExitBtn, wrapperContentInfo, wrapperContentBtn } =
	styles;

export const ConfrimationModal = ({
	confirmationModal,
	setConfirmationModal,
	price,
	totalPriceWithDiscount,
	totalPriceBeforeDiscount,
	savedMoney,
	hideModal,
	currentVariantId,
	bundleProductsAddToCart,
}: ConfrimationModalProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [isPendingBundle, startTransitionBundle] = useTransition();

	return (
		<div className={wrapper}>
			<Curtain
				show={confirmationModal}
				onClose={() => setConfirmationModal(false)}
				curtainClose={true}
				curtainColor={"black"}
			/>
			<div className={wrapperContent}>
				<div className={wrapperContentExitBtn}>
					<button onClick={() => setConfirmationModal(false)} aria-label="Close">
						<Icons.CloseSVG />
					</button>
				</div>
				<h2>Confirmation</h2>

				<div className={wrapperContentInfo}>
					{" "}
					Buy in bundle and save <p>${savedMoney}</p>{" "}
				</div>

				<div className={wrapperContentBtn}>
					<button
						onClick={() => {
							startTransition(async () => {
								const error = await addItem(currentVariantId);

								if (error) {
									throw new Error(error.toString());
								}

								setConfirmationModal(false);
								hideModal();
								router.refresh();
							});
						}}
					>
						{isPending ? <Spinner /> : <>Add Product - ${price.toFixed(2)}</>}
					</button>
					<button
						onClick={() => {
							startTransitionBundle(async () => {
								const error = await addItems(bundleProductsAddToCart);

								if (error) {
									throw new Error(error.toString());
								}

								setConfirmationModal(false);
								hideModal();
								router.refresh();
							});
						}}
					>
						{isPendingBundle ? (
							<Spinner />
						) : (
							<>
								Add Bundle - ${totalPriceWithDiscount.toFixed(2)}
								<p> ${totalPriceBeforeDiscount}</p>
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
