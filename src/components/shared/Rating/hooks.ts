import { useMemo } from "react";

const cleanRatingDisplay = (value: number) => {
	const ratingParsedToString = value.toString();

	if (ratingParsedToString.length <= 4) return ratingParsedToString;

	return value.toPrecision(3);
};

const getStars = (value: number, conditional: boolean) => {
	const totalAmountOfEmptyStars = Math.floor(maxAmountOfStars - value);

	if (conditional) return totalAmountOfEmptyStars + 1;

	return totalAmountOfEmptyStars;
};

const maxAmountOfStars = 5;
const minValueNeededToShowHalfStar = 0.1;
const maxValueNeededToShowHalfStar = 0.9;

export const useRating = (rating: number) => {
	const correctRatingValue = rating <= 0 ? 0 : rating >= 5 ? 5 : rating;
	const ratingToDisplay = cleanRatingDisplay(correctRatingValue);
	const integerRatingValue = Math.floor(correctRatingValue);
	const restFromRating = correctRatingValue - integerRatingValue;

	const isLesserThanQuarter = restFromRating <= minValueNeededToShowHalfStar && restFromRating > 0;
	const isGreaterThanThreeOfFourQuaters =
		restFromRating >= maxValueNeededToShowHalfStar && restFromRating < 1;

	const isRatingContainingRest =
		!(isLesserThanQuarter || isGreaterThanThreeOfFourQuaters) && !Number.isInteger(restFromRating);

	const starsQuantity = getStars(
		maxAmountOfStars - correctRatingValue,
		isGreaterThanThreeOfFourQuaters,
	);
	const stars = useMemo(() => new Array(starsQuantity).fill(""), [starsQuantity]);

	const emptyStarsQuantity = getStars(correctRatingValue, isLesserThanQuarter);

	const emptyStars = useMemo(() => {
		if (emptyStarsQuantity === 0) return [];

		return new Array(emptyStarsQuantity).fill("");
	}, [emptyStarsQuantity]);

	return {
		stars,
		emptyStars,
		ratingToDisplay,
		isRatingContainingRest,
	};
};
