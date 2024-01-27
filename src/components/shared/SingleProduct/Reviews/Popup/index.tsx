import { Fragment } from "react";

import { Slide } from "../Slide";
import { Filters } from "../Filters";

import type { PopupProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { useFilters } from "./hooks";

import styles from "./rwd.module.scss";
const {
	wrapperOverlay,
	wrapperContent,
	wrapperContentActive,
	wrapperContentLine,
	wrapperContentHeader,
	wrapperContentContainer,
	wrapperContentBtn,
} = styles;

export const Popup = ({
	handleMoreReviews,
	reviews,
	isMoreReviewsActive,
	handleForm,
	topics,
	filters,
	reviewsLabel,
	addReviewLabel,
	filterByLabel,
	setIsFormActive,
}: PopupProps) => {
	const { filterObjects, handleChange, isFiltered, searchTerm, setIsFiltered, setSearchTerm } =
		useFilters(reviews);

	const reviewsList = isFiltered ? filterObjects : reviews;

	return (
		<Fragment>
			{isMoreReviewsActive ? (
				<div
					className={wrapperOverlay}
					onClick={() => {
						handleMoreReviews(), setIsFormActive(false);
					}}
				/>
			) : null}

			<div className={cx(wrapperContent, isMoreReviewsActive && wrapperContentActive)}>
				<div className={wrapperContentLine} />
				<div className={wrapperContentHeader}>
					<h4>{reviewsLabel}</h4>
					<div onClick={handleMoreReviews}>
						<Icons.ExitSVG />
					</div>
				</div>
				<Filters
					topics={topics}
					handleFilter={handleChange}
					searchTerm={searchTerm}
					isFiltered={isFiltered}
					setIsFiltered={setIsFiltered}
					setSearchTerm={setSearchTerm}
					filterByLabel={filterByLabel}
					{...filters}
				/>
				<div className={wrapperContentContainer}>
					{reviewsList.map((review, idx) => (
						<Slide {...review} key={review.reviewTitle + idx} />
					))}
				</div>
				<div className={wrapperContentBtn}>
					<button onClick={handleForm}>{addReviewLabel}</button>
				</div>
			</div>
		</Fragment>
	);
};
