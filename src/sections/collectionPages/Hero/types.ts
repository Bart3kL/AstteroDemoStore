export interface HeroProps {
	bannerImage: {
		url: string;
		altText: string;
	};
	title: string;
	description: string;
	brands: {
		title: string;
		amount: number;
	}[];
}
