import type { HeaderCacheProps } from "../../types";
import type { Product } from "@/lib/shopify/functions/product/types";

export interface DesktopProps {
	navLinks: HeaderCacheProps["desktop"];
	chatData: HeaderCacheProps["chat"];
	preparedProducts: Product[];
	searchData: HeaderCacheProps["search"];
	changeHeaderBackground: boolean;
	isNotHomePage: boolean;
	cartQuantity: number;
}
