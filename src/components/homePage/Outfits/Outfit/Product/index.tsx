import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Modal } from "@/components/shared/SingleProduct/Modal";

import type { ProductProps } from "./types";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { getImagesByColor, prepareProductOptions } from "@/components/shared/SingleProduct/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperCard,
	wrapperCardContent,
	wrapperCardContentImage,
	wrapperCardContentDetails,
	wrapperCardContentDetailsDescription,
	wrapperCardContentDetailsPrice,
	wrapperCardSelectVariant,
} = styles;

export const Product = ({
	title,
	rating,
	options,
	handle,
	description,
	variants,
	handleSlideClick,
	isFreeProduct,
	totalPriceWithDiscount,
	totalPriceBeforeDiscount,
	savedMoney,
	selectedVariants,
	setSelectedVariants,
	idx,
	bundleProductsAddToCart,
}: ProductProps) => {
	const [showModal, setShowModal] = useState(false);
	const handleToggleModal = () => setShowModal(!showModal);
	const [currentVariant, setCurrentVariant] = useState(selectedVariants[idx]);

	const preparedOptions = prepareProductOptions(options);

	const { imageMini, bundleImage } = currentVariant;

	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value!;
	const images = getImagesByColor(variants, actualColor);

	useEffect(() => {
		setSelectedVariants(() => {
			const updatedVariants = [...selectedVariants];
			updatedVariants[idx] = currentVariant;
			return updatedVariants;
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentVariant]);

	return (
		<div className={cx(wrapper)}>
			<div className={wrapperCard}>
				<div className={wrapperCardContent}>
					<div className={wrapperCardContentImage}>
						<Image
							src={bundleImage ?? imageMini.url}
							alt={title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>

					<div className={wrapperCardContentDetails}>
						<h3>
							<Link
								href={`/products/${handle}?variant=${getNumberAfterLastSlash(currentVariant.id)}`}
							>
								{title}
							</Link>
							<p>{currentVariant.title}</p>
						</h3>
						<div className={wrapperCardContentDetailsPrice}>
							{isFreeProduct ? (
								<>
									<p>$ 0.00</p>
									<p>$ {Number(currentVariant.price.amount).toFixed(2)}</p>
								</>
							) : (
								<p>$ {Number(currentVariant.price.amount).toFixed(2)}</p>
							)}
						</div>
						<p className={wrapperCardContentDetailsDescription}>{description}</p>
					</div>
				</div>

				<button
					className={wrapperCardSelectVariant}
					onClick={() => {
						handleToggleModal(), handleSlideClick();
					}}
				>
					Select variant
				</button>
			</div>
			{showModal && (
				<Modal
					images={images}
					showModal={showModal}
					handleToggleModal={handleToggleModal}
					actualColor={actualColor}
					description={description}
					title={title}
					rating={rating}
					preparedOptions={preparedOptions}
					setCurrentVariant={setCurrentVariant}
					currentVariant={currentVariant}
					variants={variants}
					handle={handle}
					isBundle
					isFreeProduct={isFreeProduct}
					savedMoney={savedMoney}
					totalPriceWithDiscount={totalPriceWithDiscount}
					totalPriceBeforeDiscount={totalPriceBeforeDiscount}
					hideModal={() => setShowModal(false)}
					bundleProductsAddToCart={bundleProductsAddToCart}
				/>
			)}
		</div>
	);
};
