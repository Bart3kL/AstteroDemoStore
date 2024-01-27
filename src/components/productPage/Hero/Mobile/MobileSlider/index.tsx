import Image from "next/image";

import type { MobileSliderProps } from "./types";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { Icons } from "@/lib";
import { useWishListState } from "@/lib/zustand/wishlist";

import "./noJs.styles.scss";
import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperImages,
	wrapperDots,
	wrapperDotsDot,
	wrapperDotsDotActive,
	wrapperBadges,
	wrapperBadgesBadge,
	wrapperBadgesBadgeGreen,
	wrapperBadgesBadgeDarkPink,
	wrapperDetails,
	wrapperDetailsTitle,
	wrapperDetailsActions,
	wrapperDetailsActionsArrow,
	wrapperDetailsActionsPersonalize,
	wrapperDetailsActionsWishlist,
	wrapperDetailsActionsWishlistInWishlist,
} = styles;

export const MobileSlider = ({
	images,
	title,
	tags,
	currentSlideIdx,
	setCurrentSlideIdx,
	jsEnabled,
	mainSliderRef,
	mainInstanceRef,
	variants,
	currentVariant,
}: MobileSliderProps) => {
	const saleTag = tags.find((tag) => tag.includes("sale"));
	const newTag = tags.find((tag) => tag.includes("new"));

	const { addToWishList, variantIds, removeFromWishList, isAnimation } = useWishListState();

	const isVariantInWishlist = variants.some((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	);

	const variantIdInWishList = variants.find((variant) =>
		variantIds.includes(getNumberAfterLastSlash(variant.id)),
	)?.id!;

	const slides = [...images, images[0]];

	return (
		<div className={wrapper}>
			<div
				ref={mainSliderRef}
				className={cx("keen-slider", !jsEnabled && "noJsHero", wrapperImages)}
			>
				{slides.map((image, idx) => (
					<div
						key={image + idx + "bestseller"}
						className={cx(`keen-slider__slide number-slide-${idx}`)}
					>
						{idx !== slides.length - 1 ? (
							<Image src={image} alt={title} fill />
						) : (
							<Image src={slides[slides.length - 1]} alt={title} fill />
						)}
					</div>
				))}
			</div>
			<div className={wrapperDots}>
				{[...Array(slides.length).keys()].map((idx) => {
					return (
						<span
							key={idx}
							onClick={() => {
								if (idx === slides.length - 1) {
									setCurrentSlideIdx(slides.length - 1);
									return;
								}
								mainInstanceRef.current?.moveToIdx(idx);
							}}
							className={cx(wrapperDotsDot, currentSlideIdx === idx && wrapperDotsDotActive)}
						></span>
					);
				})}
			</div>

			<div className={wrapperBadges}>
				{saleTag && <p className={cx(wrapperBadgesBadge, wrapperBadgesBadgeDarkPink)}>{saleTag}</p>}
				{newTag && <p className={cx(wrapperBadgesBadge, wrapperBadgesBadgeGreen)}>{newTag}</p>}
			</div>
			<div className={wrapperDetails}>
				<h2 className={wrapperDetailsTitle}>{title}</h2>
				<div className={wrapperDetailsActions}>
					<button
						aria-label="Arrow down"
						className={wrapperDetailsActionsArrow}
						onClick={() => setCurrentSlideIdx(slides.length - 1)}
					>
						<Icons.ArrowDownSVG />
					</button>
					<button
						className={wrapperDetailsActionsPersonalize}
						onClick={() => setCurrentSlideIdx(slides.length - 1)}
					>
						Personalize
					</button>
					<button
						id="heartWishlist"
						onClick={(e) =>
							isVariantInWishlist && !isAnimation
								? removeFromWishList(getNumberAfterLastSlash(variantIdInWishList))
								: addToWishList(getNumberAfterLastSlash(currentVariant.id), e, true)
						}
						className={cx(
							isVariantInWishlist && wrapperDetailsActionsWishlistInWishlist,
							wrapperDetailsActionsWishlist,
						)}
					>
						{isVariantInWishlist ? <Icons.HeartSVG /> : <Icons.WishlistSVG />}
					</button>
				</div>
			</div>
		</div>
	);
};
