import { type Connection } from "../../types";

export type Product = Omit<
	ShopifyProduct,
	"variants" | "images" | "collections" | "customersAlsoPurchased"
> & {
	title: string;
	variants: ProductVariant[];
	images: Image[];
	rating: {
		stars: number;
		amount: number;
	};
	breadCrumbs: {
		title: string;
		handle?: string;
	}[];
	customersAlsoPurchased: string[];
};

export type ProductWishList = Omit<Product, "variants" | "images"> & {
	variants: ProductVariant[];
	images: Image[];
	variantInWishlist: ProductVariant;
};

export type SearchProduct = {
	availableForSale: boolean;
	handle: string;
	id: string;
	title: string;
	images: Image[];
};

export type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	quantityAvailable: number;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	image: {
		url: string;
	};
	imageSmall: {
		url: string;
	};
	imageMini: {
		url: string;
	};
	price: {
		amount: string;
		currencyCode: string;
	};
	bundleImage?: string;
	compareAtPrice: {
		amount: string;
		currencyCode: string;
	};
};

export type Money = {
	amount: string;
	currencyCode: string;
};

export type ShopifyProduct = {
	id: string;
	handle: string;
	brand: {
		value: string;
	};
	availableForSale: boolean;
	title: string;
	description: string;
	descriptionHtml: string;
	options: ProductOption[];
	priceRange: {
		maxVariantPrice: Money;
		minVariantPrice: Money;
	};
	collections: {
		edges: {
			node: {
				handle: string;
				title: string;
				subCollectionTitle?: {
					value: string;
				};
			};
		}[];
	};
	customersAlsoPurchased: {
		references: {
			edges: {
				node: {
					id: string;
				};
			}[];
		};
	};
	createdAt: string;
	variants: Connection<ProductVariant>;
	featuredImage: Image;
	images: Connection<Image>;
	seo: SEO;
	tags: string[];
	updatedAt: string;
};

export type Image = {
	src: string;
	url: string;
	altText: string;
	width: number;
	height: number;
};

export type ProductOption = {
	id?: string;
	name: string;
	values: string[];
};

export type SEO = {
	title: string;
	description: string;
};

export type ShopifyProductsId = {
	id: string;
};

export type ShopifyProductsOperation = {
	data: {
		products: Connection<Product>;
	};
	variables: {
		query?: string;
		reverse?: boolean;
		sortKey?: string;
	};
};
