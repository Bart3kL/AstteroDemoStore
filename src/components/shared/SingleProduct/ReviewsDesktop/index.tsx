import { useState, Fragment, useEffect } from "react";

import { cx } from "@/lib/utils";
import { Slide } from "../Reviews/Slide";
import { Popup } from "../Reviews/Popup";
import { Form } from "../Reviews/Form";
import { type ReviewsV2Props } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperSlides, wrapperBtn, wrapperPopup, wrapperPopupActive, wrapperOverlay } =
	styles;

export function ReviewsDesktop({
	reviewsData: { form, filters, reviewsV2, header },
	reviews: reviewsProps,
	setAreReviews,
}: ReviewsV2Props) {
	const reviewFormInformation = {
		productId: "",
		productName: "",
		productSKU: "",
		productType: "",
		description: "",
		variantName: "",
		productUrl: `/`,
		productImageUrl: "",
	};

	const [isMoreReviewsActive, setIsMoreReviewsActive] = useState(false);
	const [isFormActive, setIsFormActive] = useState(false);

	const handleMoreReviews = () => {
		setIsMoreReviewsActive((prev) => !prev);
	};
	const handleForm = () => {
		setIsFormActive((prev) => !prev);
	};

	useEffect(() => {
		if (!isMoreReviewsActive) {
			setTimeout(() => {
				setAreReviews(isMoreReviewsActive);
			}, 400);
		} else {
			setAreReviews(isMoreReviewsActive);
		}
	}, [isMoreReviewsActive, setAreReviews]);

	if (!reviewsProps) return <Fragment></Fragment>;

	const { topics, reviews } = reviewsProps;
	if (reviews.length === 0) return <Fragment></Fragment>;

	return (
		<>
			<div className={wrapper}>
				<div>
					<div className={wrapperSlides}>
						<Slide {...reviews[0]} />
						<Slide {...reviews[8]} />
					</div>
					<div className={wrapperBtn}>
						<button
							className={wrapperBtn}
							onClick={() => {
								handleMoreReviews();
							}}
						>
							{reviewsV2.readAllLabel} {reviews.length} {header.reviewsLabel}
						</button>
					</div>
				</div>

				<Form
					{...form}
					reviewFormInformation={reviewFormInformation}
					isFormActive={isFormActive}
					setIsFormActive={setIsFormActive}
					handleForm={handleForm}
					reviewsLabel={header.reviewsLabel}
					clearLabel={reviewsV2.clearLabel}
				/>
				<div className={cx(wrapperPopup, isMoreReviewsActive && wrapperPopupActive)}>
					<Popup
						reviews={reviews}
						isMoreReviewsActive={isMoreReviewsActive}
						handleMoreReviews={handleMoreReviews}
						handleForm={handleForm}
						setIsFormActive={setIsFormActive}
						topics={topics}
						filters={filters}
						reviewsLabel={header.reviewsLabel}
						{...reviewsV2}
					/>
					{isMoreReviewsActive ? (
						<div
							className={wrapperOverlay}
							onClick={() => {
								handleMoreReviews(), setIsFormActive(false);
							}}
						/>
					) : null}
				</div>
			</div>
		</>
	);
}
