import type { MobileFiltersProps } from "../MobileFilters/types";

export type DesktopFiltersProps = Omit<MobileFiltersProps, "showFilters" | "setShowFilters"> & {
	showDesktopFilters: boolean;
};
