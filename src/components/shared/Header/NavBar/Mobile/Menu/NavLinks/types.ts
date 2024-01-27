import { type HeaderCacheProps } from "../../../../types";
export interface NavLinksProps {
	showLinks: {
		active: boolean;
		category: string;
	};
	navLinks: HeaderCacheProps["mobile"];
	handleCloseLinks: () => void;
	handleToggleMenu: () => void;
}
