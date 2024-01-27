import type { HeroProps } from "./types";

export type MatchImagesToBundlesProps = {
	title: string;
	amount: number;
	image?: string;
}[];

export const matchImagesToBrands = (
	brands: HeroProps["brands"],
	ourBrands: OurBrandsCacheProps,
): MatchImagesToBundlesProps => {
	return brands.map((brand) => {
		const matchingItem = ourBrands.brands.find(
			(item1) => item1.redirection === `brands-${brand.title.toLowerCase()}`,
		);
		if (matchingItem) {
			return { ...brand, image: matchingItem.image };
		}
		return brand;
	});
};
export interface OurBrandsCacheProps {
	title: string;
	description: string;
	brands: {
		redirection: string;
		image: string;
	}[];
}
