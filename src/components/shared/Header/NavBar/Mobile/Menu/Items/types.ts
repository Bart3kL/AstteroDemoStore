import type { HeaderCacheProps } from "../../../../types";

export interface ItemsProps {
	showLinks: {
		active: boolean;
		category: string;
	};
	navLinks: HeaderCacheProps["mobile"];
	handleOpenLinks: (href: string) => void;
	handleToggleMenu: () => void;
}
