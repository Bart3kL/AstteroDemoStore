import type { HeaderDesktopSubLinksCacheProps } from "../../../../types";

export interface ItemProps {
	title: string;
	href: string;
	subLinks?: HeaderDesktopSubLinksCacheProps[];
	badge?: string;
	handleOpenLinks: (href: string) => void;
	handleToggleMenu: () => void;
}
