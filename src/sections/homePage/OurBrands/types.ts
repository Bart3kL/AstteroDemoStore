export interface OurBrandsProps {
	ourBrands: {
		title: string;
		description: string;
		brands: {
			redirection: string;
			image: string;
		}[];
	};
}
