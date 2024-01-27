import type { ReviewsType } from "../types";

export interface PopupProps {
	reviews: ReviewsType["reviews"];

	handleForm: () => void;

	topics: ReviewsType["topics"];
	filters: {
		clearBtnLabel: string;
		moreBtnLabel: string;
	};

	addReviewLabel: string;
	filterByLabel: string;
}
