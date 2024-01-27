import { useState, useEffect, useRef, useCallback } from "react";
import type { ReviewsType } from "../types";

export const useFilters = (reviews: ReviewsType["reviews"]) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isFiltered, setIsFiltered] = useState(false);
	const [filteredAndSortedArray, setFilteredAndSortedArray] = useState([]);

	const searchTermRef = useRef(searchTerm);

	useEffect(() => {
		searchTermRef.current = searchTerm;
	}, [searchTerm]);

	const filterAndSortObjects = useCallback(() => {
		if (!reviews || !reviews.length) {
			return [];
		}

		const searchTermLowerCase = searchTermRef.current.toLowerCase();

		const filteredArray = reviews.map((review) => {
			const { reviewTitle, reviewMessage } = review || {};
			const reviewTitleLower = reviewTitle ? reviewTitle.toLowerCase() : "";
			const reviewMessageLower = reviewMessage ? reviewMessage.toLowerCase() : "";

			let highlightedTitle = reviewTitle || "";
			let highlightedMessage = reviewMessage || "";

			if (searchTerm.trim() !== "") {
				const pattern = new RegExp(searchTermLowerCase, "gi");
				const isCurrentSearchTerm =
					reviewTitleLower.includes(searchTermLowerCase) ||
					reviewMessageLower.includes(searchTermLowerCase);

				if (isCurrentSearchTerm) {
					highlightedTitle = highlightedText(reviewTitle, pattern);
					highlightedMessage = highlightedText(reviewMessage, pattern);
				}
			}

			return {
				...review,
				reviewTitle: highlightedTitle,
				reviewMessage: highlightedMessage,
			};
		});

		function compare(a: ReviewsType["reviews"][0], b: ReviewsType["reviews"][0]) {
			const aContainsSearchTerm =
				a.reviewTitle.toLowerCase().includes(searchTermRef.current) ||
				a.reviewMessage.toLowerCase().includes(searchTermRef.current);
			const bContainsSearchTerm =
				b.reviewTitle.toLowerCase().includes(searchTermRef.current) ||
				b.reviewMessage.toLowerCase().includes(searchTermRef.current);

			if (aContainsSearchTerm && !bContainsSearchTerm) {
				return -1;
			} else if (!aContainsSearchTerm && bContainsSearchTerm) {
				return 1;
			} else if (aContainsSearchTerm && bContainsSearchTerm) {
				const aWords = a.reviewTitle.split(/\s+/).concat(a.reviewMessage.split(/\s+/));
				const bWords = b.reviewTitle.split(/\s+/).concat(b.reviewMessage.split(/\s+/));

				const exactMatchA = aWords.some(
					(word: string) => word.toLowerCase() === searchTermRef.current,
				);
				const exactMatchB = bWords.some(
					(word: string) => word.toLowerCase() === searchTermRef.current,
				);

				if (exactMatchA && !exactMatchB) {
					return -1;
				} else if (!exactMatchA && exactMatchB) {
					return 1;
				} else {
					const aText = a.reviewTitle + a.reviewMessage;
					const bText = b.reviewTitle + b.reviewMessage;
					return aText.localeCompare(bText);
				}
			} else {
				return 0;
			}
		}

		const sortedArray = [...filteredArray].sort(compare);

		return sortedArray;
	}, [reviews, searchTerm]);

	useEffect(() => {
		const sortedArray: any = filterAndSortObjects();
		setFilteredAndSortedArray(sortedArray);
	}, [searchTerm, filterAndSortObjects]);

	function highlightedText(text: string, pattern: RegExp) {
		return text.replace(pattern, `<span style="background-color: yellow">$&</span>`);
	}

	const handleChange = (filter: string) => {
		setIsFiltered(true);
		setSearchTerm(filter);
	};

	return {
		filterObjects: filteredAndSortedArray,
		handleChange,
		isFiltered,
		searchTerm,
		setIsFiltered,
		setSearchTerm,
	};
};
