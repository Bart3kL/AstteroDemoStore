import { type ReviewsType } from "../types";

export interface FiltersProps {
	topics: ReviewsType["topics"];
	handleFilter: (v: string) => void;
	searchTerm: string;
	isFiltered: boolean;
	setIsFiltered: (v: boolean) => void;
	clearBtnLabel: string;
	moreBtnLabel: string;
	setSearchTerm: (v: string) => void;
	filterByLabel: string;
}
