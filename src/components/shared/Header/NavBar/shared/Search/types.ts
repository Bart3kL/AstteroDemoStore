import type { Product } from "@/lib/shopify/functions/product/types";
import type { HeaderCacheProps } from "../../../types";
export interface SearchBarProps {
	isActive: boolean;
	modalAddRef: React.RefObject<HTMLDivElement>;
	preparedProducts: Product[];
	searchData: HeaderCacheProps["search"];
}
