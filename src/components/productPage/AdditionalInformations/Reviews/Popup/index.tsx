import { Slide } from "../Slide";
import { Filters } from "../Filters";

import { useFilters } from "./hooks";
import type { PopupProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContainer, wrapperBtn } = styles;

export const Popup = ({
	reviews,
	handleForm,
	topics,
	filters,
	addReviewLabel,
	filterByLabel,
}: PopupProps) => {
	const { filterObjects, handleChange, isFiltered, searchTerm, setIsFiltered, setSearchTerm } =
		useFilters(reviews);

	const reviewsList = isFiltered ? filterObjects : reviews;

	return (
		<div className={wrapper}>
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
			<div className={wrapperContainer}>
				{reviewsList.map((review, idx) => (
					<Slide {...review} key={review.reviewTitle + idx} />
				))}
			</div>
			<div className={wrapperBtn}>
				<button onClick={handleForm}>{addReviewLabel}</button>
			</div>
		</div>
	);
};
