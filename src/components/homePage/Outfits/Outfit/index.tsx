import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Product } from "./Product";
import { Spinner } from "@/components/shared/Spinner";

import type { OutfitProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { addItems } from "@/lib/shopify/functions/cart/actions";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperPlus, wrapperAddBundle, wrapperPrice } = styles;

export const Outfit = ({ products, freeProduct, idx, handleSlideClick }: OutfitProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [selectedVariants, setSelectedVariants] = useState([
		freeProduct.variants.find((variant) => variant.availableForSale)!,
		products[0].variants.find((variant) => variant.availableForSale)!,
		products[1].variants.find((variant) => variant.availableForSale)!,
	]);
	const totalPriceBeforeDiscount = [selectedVariants[1], selectedVariants[2]].reduce(
		(acc, variant) => Number(acc) + Number(variant.price.amount),
		0,
	);

	return (
		<div
			className={cx(wrapper, `carousel__cell number-slide${idx}`)}
			onClick={() => handleSlideClick(idx)}
		>
			<h3 className={wrapperTitle}>
				Save ${Number(freeProduct.variants[0].price.amount).toFixed(2)} in bundle
			</h3>

			<div>
				<>
					{[freeProduct, ...products].map((product, index) => {
						return (
							<div key={index + product.id + index}>
								{index === 1 && (
									<div className={wrapperPlus}>
										<Icons.BundlePlusSVG />
									</div>
								)}
								<Product
									{...product}
									isFreeProduct={product.id === freeProduct.id}
									savedMoney={Number(freeProduct.variants[0].price.amount).toFixed(2)}
									handleSlideClick={() => handleSlideClick(idx)}
									totalPriceWithDiscount={Number(totalPriceBeforeDiscount.toFixed(2))}
									totalPriceBeforeDiscount={(
										Number(totalPriceBeforeDiscount) + Number(freeProduct.variants[0].price.amount)
									).toFixed(2)}
									idx={index}
									selectedVariants={selectedVariants}
									setSelectedVariants={setSelectedVariants}
									bundleProductsAddToCart={selectedVariants.map((variant) => ({
										merchandiseId: variant.id,
										quantity: 1,
									}))}
								/>
								{index === 1 && (
									<div className={wrapperPlus}>
										<Icons.BundlePlusSVG />
									</div>
								)}
								{index === [freeProduct, ...products].length - 1 && (
									<div className={wrapperPlus}>
										<Icons.EqualSVG />
									</div>
								)}
							</div>
						);
					})}
					<div className={wrapperPrice}>
						<p>SAVING: ${Number(selectedVariants[0].price.amount).toFixed(2)}</p>
						<p>TOTAL: ${totalPriceBeforeDiscount.toFixed(2)}</p>
					</div>
					<button
						className={wrapperAddBundle}
						onClick={() => {
							handleSlideClick(idx),
								startTransition(async () => {
									const error = await addItems(
										selectedVariants.map((variant) => ({
											merchandiseId: variant.id,
											quantity: 1,
										})),
									);

									if (error) {
										throw new Error(error.toString());
									}

									router.refresh();
								});
						}}
					>
						{isPending ? <Spinner /> : "Add bundle to cart"}
					</button>
				</>
			</div>
		</div>
	);
};
