"use client";

import { useState } from "react";
import Image from "next/image";

import { Rating } from "../../shared/Rating";
import { Options } from "@/components/shared/Options";

import type { BestSellerProps } from "./types";
import { useSliderWithDots } from "./hooks";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { prepareProductOptions, getImagesByColor } from "@/components/shared/SingleProduct//utils";
import { Icons } from "@/lib/";
import { useWishListState } from "@/lib/zustand/wishlist";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";

import "./noJs.styles.scss";
import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperTitle,
	wrapperContent,
	wrapperContentSlider,
	wrapperContentSliderImage,
	wrapperContentSliderImageLeftArrow,
	wrapperContentSliderImageRightArrow,
	wrapperContentSliderDots,
	wrapperContentSliderDotsDot,
	wrapperContentSliderDotsDotActive,
	wrapperContentDetails,
	wrapperContentDetailsWishlist,
	wrapperContentDetailsWishlistInWishlist,
	wrapperContentDetailsTitle,
	wrapperContentDetailsRating,
	wrapperContentDetailsPrice,
	wrapperContentDetailsOptions,
	wrapperContentDetailsDescription,
	wrapperContentDetailsAddToCart,
} = styles;

export const BestSeller = ({
	title,
	variants,
	options,
	rating,
	handle,
	description,
}: BestSellerProps) => {
	const [currentVariant, setCurrentVariant] = useState(
		variants.find((variant) => variant.availableForSale)! ?? variants[0],
	);
	const { addToWishList, variantIds, removeFromWishList, isAnimation } = useWishListState();

	useBlockScroll(isAnimation);
	const { id } = currentVariant;

	const customerDeactivatedAnimation =
		typeof window !== "undefined" &&
		typeof document !== "undefined" &&
		document.cookie.includes("disallowWishlistAnimation=true");

	const isVariantInWishlist = variants.some((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	);

	const variantIdInWishList = variants.find((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	)?.id!;

	const preparedOptions = prepareProductOptions(options);

	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value!;
	const images = getImagesByColor(variants, actualColor);

	const {
		jsEnabled,
		mainSliderRef,
		mainInstanceRef,
		currentSlideIdx,
		handleNextSlideClick,
		handlePreviousSlideClick,
	} = useSliderWithDots(actualColor);

	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>Best seller</h2>

			<div className={wrapperContent}>
				<div className={wrapperContentSlider}>
					<div
						ref={mainSliderRef}
						className={cx("keen-slider", !jsEnabled && "noJsHero", wrapperContentSliderImage)}
					>
						<div>
							<div
								onClick={handlePreviousSlideClick}
								className={wrapperContentSliderImageLeftArrow}
							>
								<Icons.ArrowLeftSVG />
							</div>
							<div onClick={handleNextSlideClick} className={wrapperContentSliderImageRightArrow}>
								<Icons.ArrowRightSVG />
							</div>
						</div>
						{images.map((image, idx) => (
							<div
								key={image + idx + "bestseller"}
								className={cx(`keen-slider__slide number-slide-${idx}`)}
							>
								<Image src={image} alt={currentVariant.title} fill />
							</div>
						))}
					</div>
					<div className={wrapperContentSliderDots}>
						{[...Array(images.length).keys()].map((idx) => {
							return (
								<span
									key={idx}
									onClick={() => {
										mainInstanceRef.current?.moveToIdx(idx);
									}}
									className={cx(
										wrapperContentSliderDotsDot,
										currentSlideIdx === idx && wrapperContentSliderDotsDotActive,
									)}
								></span>
							);
						})}
					</div>
				</div>
				<div className={wrapperContentDetails}>
					<div className={wrapperContentDetailsWishlist}>
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
							className={cx(isVariantInWishlist && wrapperContentDetailsWishlistInWishlist)}
						>
							<Icons.HeartSVG />
						</button>
					</div>
					<h3 className={wrapperContentDetailsTitle}>{title}</h3>
					<div className={wrapperContentDetailsRating}>
						<Rating rating={rating.stars} amount={rating.amount} />
					</div>
					<div className={wrapperContentDetailsPrice}>
						<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
						{Number(currentVariant.compareAtPrice?.amount) >
							Number(currentVariant.price.amount) && (
							<p>${Number(currentVariant.compareAtPrice?.amount).toFixed(2)}</p>
						)}
					</div>
					<div className={wrapperContentDetailsOptions}>
						<Options
							preparedOptions={preparedOptions}
							title={title}
							rating={rating}
							setCurrentVariant={setCurrentVariant}
							currentVariant={currentVariant}
							variants={variants}
							handle={handle}
						/>
					</div>
					<div className={wrapperContentDetailsDescription}>{description}</div>
					<div className={wrapperContentDetailsAddToCart}>
						<button>Add to cart</button>
					</div>
				</div>
			</div>
		</div>
	);
};
