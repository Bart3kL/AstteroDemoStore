export interface ColorProps {
	colorFilters: string[];
	toggleColorFilter: (color: string) => void;
	availableColors: string[];
}
