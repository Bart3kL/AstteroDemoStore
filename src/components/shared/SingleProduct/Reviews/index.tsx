import { useState, Fragment } from "react";

import { Slide } from "./Slide";
import { Popup } from "./Popup";
import { Form } from "./Form";

import { type ReviewsV2Props } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperBtn } = styles;

export function Reviews({
	reviewsData: { form, filters, reviewsV2, header },
	reviews: reviewsProps,
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

	if (!reviewsProps) return <Fragment></Fragment>;

	const { topics, reviews } = reviewsProps;
	if (reviews.length === 0) return <Fragment></Fragment>;

	return (
		<>
			<div className={wrapper}>
				<Slide {...reviews[0]} />

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
		</>
	);
}
