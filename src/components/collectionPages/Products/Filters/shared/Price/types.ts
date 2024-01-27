export interface PriceProps {
	setMinPriceFilter: (value: number) => void;
	setMaxPriceFilter: (value: number) => void;
	currentMin: number;
	currentMax: number;
	minVal: number;
	maxVal: number;
	step: number;
	areMobileFilters?: boolean;
}
