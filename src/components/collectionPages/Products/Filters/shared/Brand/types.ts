export interface BrandProps {
	brandFilters: string[];
	toggleBrandFilter: (brand: string) => void;
	availableBrands: string[];
}
