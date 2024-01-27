import type { Product } from "@/lib/shopify/functions/product/types";
import type { AnnouncementBarProps } from "./AnnouncementBar/types";

export interface HeaderProps {
	preparedProducts: Product[];
	announcementBarCache: AnnouncementBarProps;
	headerData: HeaderCacheProps;
	subCollections?: {
		handle: string;
		title: string;
	}[];
	cartQuantity: number;
}

export type HeaderDesktopCacheProps = {
	title: string;
	href: string;
	subLinks?: HeaderDesktopSubLinksCacheProps[];
	badge?: string;
	popularProducts?: {
		title: string;
		href: string;
	}[];
	brands?: {
		title?: string;
		list?: HeaderDesktopBrandsListCacheProps[];
	};
	banners?: HeaderDesktopBannersCacheProps;
};

export type HeaderDesktopBrandsListCacheProps = {
	image: {
		src: string;
		alt: string;
	};
	href: string;
};

export type HeaderDesktopSubLinksCacheProps = {
	title: string;
	href: string;
};

export type HeaderDesktopBannersCacheProps = {
	type?: string;
	title?: string;
	products?: {
		title: string;
		href: string;
		image: {
			src: string;
			alt: string;
		};
	}[];
	list?: {
		title: string;
		href: string;
		image: {
			src: string;
			alt: string;
		};
	}[];
};

export type HeaderSearchProps = {
	inputLabel: string;
	noResultsLabel: string;
	suggestionsLabel: string;
	suggestionsList: string[];
};

export type HeaderChatProps = {
	title: string;
	phoneNumber: string;
	startChatLabel: string;
	contactUsLabel: string;
	contactPageRedirection: string;
};
export type HeaderCacheProps = {
	mobile: {
		title: string;
		href: string;
		subLinks?: {
			title: string;
			href: string;
		}[];
		badge?: string;
	}[];
	desktop: HeaderDesktopCacheProps[];
	search: HeaderSearchProps;
	chat: HeaderChatProps;
};
