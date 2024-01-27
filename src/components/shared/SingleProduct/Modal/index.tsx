import { useState } from "react";

import { Portal } from "../../../shared/Modal/Portal";
import { Curtain } from "../../../shared/Modal/Curtain";
import { ImagesSlider } from "./ImagesSlider";
import { Options } from "../../Options";
import { AddToCart } from "../../AddToCart";
import { Reviews } from "../Reviews";
import { ReviewsDesktop } from "../ReviewsDesktop";
import { ConfrimationModal } from "./ConfrimationModal";

import type { ModalProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";
import { data } from "./mock";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperBlockScroll,
	wrapperExit,
	wrapperExitBtn,
	wrapperImages,
	wrapperDetails,
	wrapperDetailsTitle,
	wrapperDetailsDescription,
	wrapperDetailsBundlePrice,
	wrapperDetailsPrice,
	wrapperOptions,
	wrapperAddToCart,
	wrapperDesktopReviews,
	wrapperDesktopReviewsHide,
} = styles;

export const Modal = ({
	images,
	handleToggleModal,
	showModal,
	actualColor,
	description,
	title,
	preparedOptions,
	rating,
	setCurrentVariant,
	currentVariant,
	variants,
	handle,
	isBundle,
	totalPriceWithDiscount,
	totalPriceBeforeDiscount,
	isFreeProduct,
	hideModal,
	savedMoney,
	bundleProductsAddToCart,
}: ModalProps) => {
	const [areRevies2, setAreReviews2] = useState(false);
	const { productSelect, reviewsData } = data;

	const [confirmationModal, setConfirmationModal] = useState(false);

	useBlockScroll(showModal);
	return (
		<Portal>
			<Curtain
				show={showModal}
				onClose={handleToggleModal}
				curtainClose={true}
				curtainColor={"black"}
			/>
			<div className={cx(wrapper, (areRevies2 || confirmationModal) && wrapperBlockScroll)}>
				<div className={wrapperExitBtn}>
					<button onClick={handleToggleModal} aria-label="Close">
						<Icons.CloseSVG />
					</button>
				</div>
				<div>
					<div className={wrapperExit}>
						<button onClick={handleToggleModal} aria-label="Close">
							<Icons.CloseSVG />
						</button>
					</div>
					<div className={wrapperImages}>
						<ImagesSlider images={images} actualColor={actualColor} />
					</div>
					<div>
						<div className={wrapperDetails}>
							<h3 className={wrapperDetailsTitle}>{title}</h3>
							<p className={wrapperDetailsDescription}>{description}</p>
							{isBundle ? (
								<div className={wrapperDetailsBundlePrice}>
									{isFreeProduct && <span>Only In Bundle: </span>}
									<div>
										{isFreeProduct ? (
											<>
												<p>0.00</p>
												<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
											</>
										) : (
											<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
										)}
									</div>
								</div>
							) : (
								<div className={wrapperDetailsPrice}>
									<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
									{Number(currentVariant.compareAtPrice?.amount) >
										Number(currentVariant.price.amount) && (
										<p>${Number(currentVariant.compareAtPrice?.amount).toFixed(2)}</p>
									)}
								</div>
							)}
						</div>
						<div className={wrapperOptions}>
							<Options
								preparedOptions={preparedOptions}
								title={title}
								rating={rating}
								setCurrentVariant={setCurrentVariant}
								currentVariant={currentVariant}
								variants={variants}
								hideHeader
								handle={handle}
								isBundle={isBundle}
							/>
						</div>
						<div className={wrapperAddToCart}>
							<AddToCart
								isBundle={isBundle}
								setConfirmationModal={setConfirmationModal}
								currentVariantId={currentVariant.id}
								hideModal={hideModal}
								quantityAvailable={currentVariant.quantityAvailable}
								currentVariantIsAvailableForSale={currentVariant.availableForSale}
								bundleProductsAddToCart={bundleProductsAddToCart}
							/>
						</div>
					</div>
					<Reviews {...productSelect} reviewsData={reviewsData} />
				</div>
				<div className={cx(wrapperDesktopReviews, areRevies2 && wrapperDesktopReviewsHide)}>
					<ReviewsDesktop
						{...productSelect}
						reviewsData={reviewsData}
						setAreReviews={setAreReviews2}
					/>
				</div>
				{confirmationModal &&
					currentVariant.price.amount &&
					totalPriceWithDiscount &&
					totalPriceBeforeDiscount &&
					savedMoney &&
					bundleProductsAddToCart && (
						<ConfrimationModal
							confirmationModal={confirmationModal}
							setConfirmationModal={setConfirmationModal}
							price={Number(Number(currentVariant.price.amount).toFixed(2))}
							totalPriceWithDiscount={totalPriceWithDiscount}
							totalPriceBeforeDiscount={totalPriceBeforeDiscount}
							hideModal={hideModal}
							currentVariantId={currentVariant.id}
							savedMoney={savedMoney}
							bundleProductsAddToCart={bundleProductsAddToCart}
						/>
					)}
			</div>
		</Portal>
	);
};
