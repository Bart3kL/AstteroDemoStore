import type { RatingProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";
import { useRating } from "./hooks";

import styles from "./rwd.module.scss";
const { wrapper, wrapperStars } = styles;

export const Rating = ({ rating, amount }: RatingProps) => {
	const { emptyStars, isRatingContainingRest, stars } = useRating(rating);

	if (amount === 0) {
		return null;
	}

	return (
		<div className={wrapper}>
			<div className={cx(wrapperStars)}>
				{stars.map((_, i) => (
					<Icons.StarSVG key={`reviewsStar${i}`} />
				))}
				{isRatingContainingRest && <Icons.StarHalfSVG />}
				{emptyStars.length > 0 &&
					emptyStars.map((_, i) => <Icons.StarEmptySVG key={`reviewsEmptyStar${i}`} />)}
			</div>
			{amount && <span>{amount} reviews</span>}
		</div>
	);
};
