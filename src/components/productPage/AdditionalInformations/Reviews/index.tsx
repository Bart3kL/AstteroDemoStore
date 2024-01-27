import { useState, Fragment } from "react";

import { Popup } from "./Popup";
import { Form } from "./Form";

import { type ReviewsV2Props } from "./types";
import { cx } from "@/lib/utils";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive, wrapperOverlay, wrapperOverlayActive } = styles;

export function Reviews({
	reviewsData: { form, filters, reviewsV2, header },
	reviews: reviewsProps,
	currentTab,
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

	const [isFormActive, setIsFormActive] = useState(false);
	useBlockScroll(isFormActive);

	const handleForm = () => {
		setIsFormActive((prev) => !prev);
	};

	if (!reviewsProps) return <Fragment></Fragment>;

	const { topics, reviews } = reviewsProps;
	if (reviews.length === 0) return <Fragment></Fragment>;

	return (
		<div className={cx(wrapper, currentTab && wrapperActive)}>
			<div
				className={cx(wrapperOverlay, isFormActive && wrapperOverlayActive)}
				onClick={() => {
					setIsFormActive(false);
				}}
			/>
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
				handleForm={handleForm}
				topics={topics}
				filters={filters}
				{...reviewsV2}
			/>
		</div>
	);
}
