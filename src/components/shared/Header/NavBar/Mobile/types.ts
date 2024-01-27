import type { HeaderCacheProps } from "../../types";
import type { Product } from "@/lib/shopify/functions/product/types";
export interface MobileProps {
	navLinks: HeaderCacheProps["mobile"];
	searchData: HeaderCacheProps["search"];
	chatData: HeaderCacheProps["chat"];
	preparedProducts: Product[];
}
