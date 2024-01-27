import type { ReviewsType } from "../types";

export interface PopupProps {
	handleMoreReviews: () => void;
	reviews: ReviewsType["reviews"];
	isMoreReviewsActive: boolean;
	handleForm: () => void;
	setIsFormActive: (v: boolean) => void;
	topics: ReviewsType["topics"];
	filters: {
		clearBtnLabel: string;
		moreBtnLabel: string;
	};
	reviewsLabel: string;
	addReviewLabel: string;
	filterByLabel: string;
}
