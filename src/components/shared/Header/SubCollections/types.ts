import type { Product } from "@/lib/shopify/functions/product/types";
import type { HeaderCacheProps } from "../types";

export interface NavBarProps {
	preparedProducts: Product[];
	mobile: HeaderCacheProps["mobile"];
	desktop: HeaderCacheProps["desktop"];
	search: HeaderCacheProps["search"];
	chat: HeaderCacheProps["chat"];
	changeHeaderBackground: boolean;
	isNotHomePage: boolean;
}
