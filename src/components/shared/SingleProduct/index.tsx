import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Modal } from "./Modal";
import { Options } from "../Options";
import { AddToCart } from "../AddToCart";
import { Rating } from "../../shared/Rating";

import type { ProductProps } from "./types";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { Icons } from "@/lib";
import { prepareProductOptions, getImagesByColor } from "./utils";
import { useWishListState } from "@/lib/zustand/wishlist";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperHeader,
	wrapperHeaderPrice,
	wrapperImage,
	wrapperImageBadges,
	wrapperImageBadgesBadge,
	wrapperImageBadgesBadgeGreen,
	wrapperImageBadgesBadgeDarkPink,
	wrapperImageActions,
	wrapperImageActionsInWishlist,
	wrapperDetails,
} = styles;

export const SingleProduct = ({
	title,
	idx,
	brand,
	variants,
	tags,
	options,
	rating,
	description,
	handle,
}: ProductProps) => {
	const [showModal, setShowModal] = useState(false);
	const handleToggleModal = () => setShowModal(!showModal);
	const [currentVariant, setCurrentVariant] = useState(
		variants.find((variant) => variant.availableForSale)! ?? variants[0],
	);

	const { addToWishList, variantIds, removeFromWishList, isAnimation } = useWishListState();

	useBlockScroll(isAnimation);
	const { imageSmall, id } = currentVariant;

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

	const saleTag = tags.find((tag) => tag.includes("sale"));
	const newTag = tags.find((tag) => tag.includes("new"));

	const preparedOptions = prepareProductOptions(options);

	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value!;
	const images = getImagesByColor(variants, actualColor);

	return (
		<div className={cx(wrapper, `keen-slider__slide number-slide-${idx}`)}>
			<div className={wrapperHeader}>
				<h3>
					<Link href={`/collections/${brand.value}`}>{brand.value}</Link>
				</h3>
				<div className={wrapperHeaderPrice}>
					<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
					{Number(currentVariant.compareAtPrice?.amount) > Number(currentVariant.price.amount) && (
						<p>${Number(currentVariant.compareAtPrice?.amount).toFixed(2)}</p>
					)}
				</div>
			</div>
			<div className={wrapperImage}>
				<Link
					href={`/products/${handle}?variant=${getNumberAfterLastSlash(currentVariant.id)}`}
					aria-label={`Redirection to ${title} page`}
				>
					<Image
						src={imageSmall.url}
						alt={title}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					/>
				</Link>
				<div className={wrapperImageBadges}>
					{saleTag && (
						<p className={cx(wrapperImageBadgesBadge, wrapperImageBadgesBadgeDarkPink)}>
							{saleTag}
						</p>
					)}
					{newTag && (
						<p className={cx(wrapperImageBadgesBadge, wrapperImageBadgesBadgeGreen)}>{newTag}</p>
					)}
				</div>
				<div className={wrapperImageActions}>
					<button
						aria-label="wishlist"
						id="heartWishlist"
						onClick={(e) =>
							isVariantInWishlist && !isAnimation
								? removeFromWishList(getNumberAfterLastSlash(variantIdInWishList))
								: addToWishList(
										getNumberAfterLastSlash(id),
										e,
										customerDeactivatedAnimation ? true : false,
								  )
						}
						className={cx(isVariantInWishlist && wrapperImageActionsInWishlist)}
					>
						<Icons.HeartSVG />
					</button>
					<button onClick={handleToggleModal} aria-label="Preview">
						<Icons.EyeSVG />
					</button>
				</div>
			</div>
			<div className={wrapperDetails}>
				<Rating rating={rating.stars} amount={rating.amount} />
				<h3>
					<Link href={`/products/${handle}?variant=${getNumberAfterLastSlash(currentVariant.id)}`}>
						{title}
					</Link>
				</h3>
			</div>
			<Options
				preparedOptions={preparedOptions}
				title={title}
				rating={rating}
				setCurrentVariant={setCurrentVariant}
				currentVariant={currentVariant}
				variants={variants}
				handle={handle}
			/>
			<AddToCart
				currentVariantId={currentVariant.id}
				hideModal={() => setShowModal(false)}
				quantityAvailable={currentVariant.quantityAvailable}
				currentVariantIsAvailableForSale={currentVariant.availableForSale}
			/>
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
