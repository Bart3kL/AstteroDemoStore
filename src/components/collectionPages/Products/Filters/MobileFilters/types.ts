export interface MobileFiltersProps {
	showFilters: boolean;
	setShowFilters: (showFilters: boolean) => void;
	title: string;
	productsTotalLength: number;
	filteredProductsLength: number;
	highestPrice: number;
	lowestPrice: number;

	availableColors: string[];
	colorFilters: string[];
	toggleColorFilter: (color: string) => void;

	ratingFilters: number[];
	toggleRatingFilter: (rating: number) => void;
	availableRating: number[];

	minPriceFilter: number;
	maxPriceFilter: number;
	setMinPriceFilter: (minPrice: number) => void;
	setMaxPriceFilter: (maxPrice: number) => void;

	availableSizes: string[];
	sizeFilters: string[];
	toggleSizeFilter: (size: string) => void;

	availableBrands: string[];
	brandFilters: string[];
	toggleBrandFilter: (brand: string) => void;

	availableMaterials: string[];
	materialFilters: string[];
	toggleMaterialFilter: (material: string) => void;

	applyFilters: () => void;
	clearAllFilters: () => void;
}
