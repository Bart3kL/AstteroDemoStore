import type { HeaderDesktopCacheProps } from "../../../../types";

export interface NavItemProps {
	title: string;
	href: string;
	badge?: string;
	subLinks?: HeaderDesktopCacheProps["subLinks"];
	popularProducts?: HeaderDesktopCacheProps["popularProducts"];
	banners?: HeaderDesktopCacheProps["banners"];
	brands?: HeaderDesktopCacheProps["brands"];
}
