import type { KeenSliderInstance, KeenSliderOptions } from "keen-slider/react";

export type ReviewsType = {
	reviewsRating: {
		count: number;
		rating: number;
	};
	reviews: {
		id: number;
		reviewRating: number;
		reviewDate: string;
		reviewMessage: string;
		avatar: string;
		reviewTitle: string;
		verified: boolean;
		productVariantName?: string;
		productName: string;
		author: string;
		reviewUserVideos: string[];
		reviewUserPhotos: string[];
		reviewOptionsList: {
			message: string;
			value: string;
		}[];
		popUp: {
			reviewVotesUp: number;
			reviewVotesDown: number;
			productUrl: string;
			productName: string;
			productImage: string;
		};
	}[];
	topics: {
		topicId: number;
		title: string;
		total: number;
		similiarity: number;
	}[];
};

export type CarouselRef = any;

export type CarouselOptions = KeenSliderOptions;
export type CarouselInstance = KeenSliderInstance;

export interface ReviewsV2Props {
	reviews: ReviewsType;

	reviewsData: ReviewsProps["reviews"];
}
export interface ReviewsProps {
	reviews: {
		reviewsV2: {
			readAllLabel: string;
			addReviewLabel: string;
			filterByLabel: string;
			clearLabel: string;
		};
		loadMoreLabel: string;
		showLessLabel: string;
		writeReviewLabel: string;
		noReviewsLabel: string;
		optionsFilters: {
			sleep: { name: string; value: string }[];
			quality: { name: string; value: string }[];
			comfort: { name: string; value: string }[];
			sort: { name: string; value: string }[];
		};
		header: {
			reviewsLabel: string;
			countLabel: string;
		};
		customerReviewsLabel: string;
		filters: {
			clearBtnLabel: string;
			moreBtnLabel: string;
			filterReviewsLabel: string;
		};
		reviewData: {
			verifiedLabel: string;
			dataLabel: string;
		};
		form: {
			firstName: {
				label: string;
				placeholder: string;
			};
			email: {
				label: string;
				placeholder: string;
			};
			rating: string;
			review: {
				label: string;
				placeholder: string;
			};
			reviewTitle: {
				label: string;
				placeholder: string;
			};
			sleepQuality: {
				id: string;
				label: string;
			};
			productQuality: {
				id: string;
				label: string;
			};
			comfy: {
				id: string;
				label: string;
			};
			photos: string;
			optionalSuffix: string;
			buttonLabel: string;
			successMessage: {
				title: string;
				subtitle: string;
				facebook: {
					label: string;
					href: string;
				};
				twitter: {
					label: string;
					href: string;
				};
			};
		};
	};
}
