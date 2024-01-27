import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Rating } from "../../../shared/Rating";
import { Modal } from "@/components/shared/SingleProduct/Modal";
import { Options } from "@/components/shared/Options";
import { AddToCart } from "@/components/shared/AddToCart";

import type { ProductProps } from "./types";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { useWishListState } from "@/lib/zustand/wishlist";
import { Icons } from "@/lib";
import { getImagesByColor, prepareProductOptions } from "@/components/shared/SingleProduct/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperFade,
	wrapperCard,
	wrapperCardHeader,
	wrapperCardHeaderBrand,
	wrapperCardHeaderActions,
	wrapperCardHeaderActionsInWishlist,
	wrapperCardContent,
	wrapperCardContentImage,
	wrapperCardContentDetails,
	wrapperCardContentDetailsRating,
	wrapperCardContentDetailsDescription,
	wrapperCardContentDetailsPrice,
	wrapperCardContentDetailsOptions,
	wrapperCardContentDetailsAddToCart,
} = styles;

export const Product = ({
	title,
	rating,
	options,
	brand,
	handle,
	idx,
	description,
	variants,
	shouldFade,
}: ProductProps) => {
	const [isClient, setIsClient] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const handleToggleModal = () => setShowModal(!showModal);
	const [currentVariant, setCurrentVariant] = useState(
		variants.find((variant) => variant.availableForSale)! ?? variants[0],
	);
	const { addToWishList, variantIds, removeFromWishList, isAnimation } = useWishListState();

	useEffect(() => {
		setIsClient(true);
	}, []);

	const preparedOptions = prepareProductOptions(options);

	const { imageSmall, id } = currentVariant;

	const customerDeactivatedAnimation =
		isClient && document.cookie.includes("disallowWishlistAnimation=true");

	const isVariantInWishlist = variants.some((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	);

	const variantIdInWishList = variants.find((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	)?.id!;

	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value!;
	const images = getImagesByColor(variants, actualColor);

	return (
		<div
			className={cx(wrapper, `keen-slider__slide number-slide-${idx}`, shouldFade && wrapperFade)}
		>
			<div className={wrapperCard}>
				<div className={wrapperCardHeader}>
					<Link href={`/collections/${brand?.value}`} className={wrapperCardHeaderBrand}>
						{brand?.value}
					</Link>
					<div className={wrapperCardHeaderActions}>
						<button
							aria-label="Add to wishlist"
							onClick={(e) =>
								isVariantInWishlist && !isAnimation
									? removeFromWishList(getNumberAfterLastSlash(variantIdInWishList))
									: addToWishList(
											getNumberAfterLastSlash(id),
											e,
											customerDeactivatedAnimation ? true : false,
									  )
							}
							className={cx(isVariantInWishlist && wrapperCardHeaderActionsInWishlist)}
						>
							<Icons.HeartSVG />
						</button>
						<button onClick={handleToggleModal} aria-label="Preview popup">
							<Icons.EyeSVG />
						</button>
					</div>
				</div>
				<div className={wrapperCardContent}>
					<div className={wrapperCardContentImage}>
						<Image
							src={imageSmall.url}
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
						</h3>
						<div className={wrapperCardContentDetailsRating}>
							{" "}
							<Rating rating={rating.stars} amount={rating.amount} />
						</div>
						<div className={wrapperCardContentDetailsPrice}>
							<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
							{Number(currentVariant.compareAtPrice?.amount) >
								Number(currentVariant.price.amount) && (
								<p>${Number(currentVariant.compareAtPrice?.amount).toFixed(2)}</p>
							)}
						</div>
						<p className={wrapperCardContentDetailsDescription}>{description}</p>
						<div className={wrapperCardContentDetailsOptions}>
							<Options
								preparedOptions={preparedOptions}
								title={title}
								rating={rating}
								setCurrentVariant={setCurrentVariant}
								currentVariant={currentVariant}
								variants={variants}
								hideHeader
								handle={handle}
							/>
						</div>
						<div className={wrapperCardContentDetailsAddToCart}>
							<AddToCart
								currentVariantId={currentVariant.id}
								quantityAvailable={currentVariant.quantityAvailable}
								currentVariantIsAvailableForSale={currentVariant.availableForSale}
							/>
						</div>
						<button onClick={handleToggleModal}>Select variant</button>
					</div>
				</div>
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
					hideModal={() => setShowModal(false)}
				/>
			)}
		</div>
	);
};
