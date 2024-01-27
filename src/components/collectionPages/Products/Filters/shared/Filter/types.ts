export interface FilterProps {
	children: React.ReactNode;
	title: string;
	filters?: string[] | number[];
	prices?: {
		minPriceFilter: number;
		maxPriceFilter: number;
	};
	isDesktop?: boolean;
	highestPrice?: number;
	lowestPrice?: number;
}
