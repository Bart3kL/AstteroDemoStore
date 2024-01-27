import type { HeaderDesktopCacheProps } from "../../../../types";

export interface NavModalProps {
	popularProducts?: HeaderDesktopCacheProps["popularProducts"];
	banners?: HeaderDesktopCacheProps["banners"];
	brands?: HeaderDesktopCacheProps["brands"];
	isModalOpen: boolean;
	selectedSubLinks: HeaderDesktopCacheProps["subLinks"];
}
