import { type Connection } from "../../types";
import type { ShopifyProductsId } from "../product/types";

export type ShopifyCollectionsOperation = {
	data: {
		collections: {
			edges: {
				node: {
					handle: string;
					products: Connection<ShopifyProductsId>;
				};
			}[];
		};
	};
};
