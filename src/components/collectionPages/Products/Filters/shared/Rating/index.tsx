import { Rating } from "../../../../../shared/Rating";

import type { RatingFilterProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperCheckbox, wrapperInputCheckbox, wrapperInputLabel } = styles;

export const RatingFilter = ({
	ratingFilters,
	toggleRatingFilter,
	availableRating,
}: RatingFilterProps) => {
	return (
		<div className={wrapper}>
			{availableRating.map((rating, idx) => (
				<div className={wrapperCheckbox} key={"rating" + rating + idx}>
					<input
						className={wrapperInputCheckbox}
						id={rating.toString()}
						type="checkbox"
						checked={ratingFilters.includes(rating)}
						onChange={() => toggleRatingFilter(rating)}
					/>
					<label className={wrapperInputLabel} onClick={() => toggleRatingFilter(rating)}>
						<Rating rating={Number(rating)} />
					</label>
				</div>
			))}
		</div>
	);
};
