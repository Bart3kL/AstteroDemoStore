export type HeroTypeProps = Pick<HeroProps, "bannerImage" | "description" | "title"> & {
	brands: {
		title: string;
		amount: number;
		image?: string;
	}[];
};

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
