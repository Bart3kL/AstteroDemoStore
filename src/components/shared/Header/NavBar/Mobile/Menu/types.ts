import type { HeaderCacheProps } from "../../../types";

export interface MenuProps {
	handleToggleMenu: () => void;
	showMenu: boolean;
	navLinks: HeaderCacheProps["mobile"];
}
