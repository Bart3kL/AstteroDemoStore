export interface CurrentFiltersProps {
	colorFilters: string[];
	toggleColorFilter: (color: string) => void;
	ratingFilters: number[];
	toggleRatingFilter: (rating: number) => void;
	minPriceFilter: number;
	maxPriceFilter: number;
	setMinPriceFilter: (price: number) => void;
	setMaxPriceFilter: (price: number) => void;
	sizeFilters: string[];
	toggleSizeFilter: (size: string) => void;
	brandFilters: string[];
	toggleBrandFilter: (brand: string) => void;
	materialFilters: string[];
	toggleMaterialFilter: (material: string) => void;
	showDesktopFilters: boolean;
	highestPrice: number;
	lowestPrice: number;
}
