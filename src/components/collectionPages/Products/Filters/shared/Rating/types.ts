export interface RatingFilterProps {
	ratingFilters: number[];
	toggleRatingFilter: (rating: number) => void;
	availableRating: number[];
}
