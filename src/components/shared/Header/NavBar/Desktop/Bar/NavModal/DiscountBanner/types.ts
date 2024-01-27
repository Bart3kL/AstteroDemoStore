import type { HeaderDesktopBannersCacheProps } from "../../../../../types";

export interface DiscountBannerProps {
	products?: HeaderDesktopBannersCacheProps["products"];
	title?: string;
	type?: string;
	image: {
		src: string;
		alt: string;
	};
	idx: number;
	href: string;
}
