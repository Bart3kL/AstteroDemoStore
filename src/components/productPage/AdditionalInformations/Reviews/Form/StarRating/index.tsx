import type { StarRatingProps } from "./types";
import { Icons } from "@/lib";
import { useStarRating } from "./hooks";

import styles from "./base.module.scss";
const { wrapper, wrapperLabel, wrapperLabelInput, wrapperLabelInputStar, wrapperLabelInputEmpty } =
	styles;

export const StarRating = ({ handleClickCallback, ratingValue }: StarRatingProps) => {
	const { handleClick } = useStarRating(handleClickCallback);

	return (
		<div className={wrapper}>
			<>
				{Array.from(Array(5), (_, index) => {
					const starValue = index + 1;
					const isCurrentStarChecked = starValue <= ratingValue;

					return (
						<label className={wrapperLabel} key={index}>
							<input
								type="radio"
								name="starRating"
								value={index + 1}
								className={wrapperLabelInput}
								id="starRating"
								onClick={handleClick}
							/>
							{isCurrentStarChecked ? (
								<div className={wrapperLabelInputStar}>
									<Icons.StarFormFillSVG />
								</div>
							) : (
								<div className={wrapperLabelInputEmpty}>
									<Icons.StarFormSVG />
								</div>
							)}
						</label>
					);
				})}
			</>
		</div>
	);
};
