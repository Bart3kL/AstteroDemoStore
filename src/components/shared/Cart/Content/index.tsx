import Link from "next/link";

import { Product } from "./Product";

// import type { ModalProps } from "./types";

import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentTitle,
	wrapperContentShipping,
	wrapperContentShippingInfo,
	wrapperContentShippingCalculate,
	wrapperContentProducts,
	wrapperSummary,
	wrapperSummaryBtn,
} = styles;

export const Content = ({ products, price, checkoutUrl }: any) => {
	const isFreeShipping = price > 50;

	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<h3 className={wrapperContentTitle}>shipping cart</h3>
				<div className={wrapperContentShipping}>
					<div className={wrapperContentShippingInfo}>
						{isFreeShipping ? (
							<span>
								Congratulations! You are qualified a <b>FREE SHIPPING</b>
							</span>
						) : (
							<span>
								Almost there, add{" "}
								<b>
									<span>$</span>
									{Number(50 - price).toFixed(2)}
								</b>{" "}
								more to get <b>FREE SHIPPING</b>
							</span>
						)}
					</div>
					<div className={wrapperContentShippingCalculate}>
						<div>
							<Icons.DeliverySVG />
							<Icons.CalculatorSVG />
						</div>
						<button>calculate delivery date</button>
					</div>
				</div>
				<div className={wrapperContentProducts}>
					{products.map((product: any, idx: number) => (
						<Product {...product} key={idx + product.id} saveChangesButtonLabel="Save" />
					))}
				</div>
			</div>
			<div className={wrapperSummary}>
				<h3>subtotal ${Number(price).toFixed(2)}</h3>
				<div className={wrapperSummaryBtn}>
					<button>
						<Link href={checkoutUrl}>Checkout</Link>
					</button>
				</div>
			</div>
		</div>
	);
};
