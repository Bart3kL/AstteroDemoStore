import type { Product } from "@/lib/shopify/functions/product/types";
import type { HeaderCacheProps } from "../../../types";
export interface BarProps {
	handleToggleMenu: () => void;
	preparedProducts: Product[];
	searchData: HeaderCacheProps["search"];
	chatData: HeaderCacheProps["chat"];
}
