export interface PriceProps {
	minPriceFilter: number;
	maxPriceFilter: number;
	setMinPriceFilter: (price: number) => void;
	setMaxPriceFilter: (price: number) => void;
	highestPrice: number;
	lowestPrice: number;
	title: string;
}
