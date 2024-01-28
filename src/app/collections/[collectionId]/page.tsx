import { HeaderSection } from "@/sections/shared/Header";
import { HeroSection } from "@/sections/collectionPages/Hero";
import { ProductsSection } from "@/sections/collectionPages/Products";
import { BestSellerSection } from "@/sections/collectionPages/BestSeller";
import { WhatPeopleSaySection } from "@/sections/collectionPages/WhatPeopleSay";

//shared
import { WishListSection } from "@/sections/shared/WishList";
import { MobileBottomPanelSection } from "@/sections/shared/MobileBottomPanel";
import { CartSection } from "@/sections/shared/Cart";
import { OutOfStockNotificationSection } from "@/sections/shared/OutOfStockNotification";

import { fetchGraphQL } from "@/lib/contentful";
import { getWishlistQuery } from "@/lib/contentful/queries/shared";

import { getCollectionPagesCache } from "@/lib/shopify/functions/collection/collection";
import { getPreparedProducts } from "@/lib/shopify/functions/product/products";
import { countBrands, prepareFiltersUrlParamsToObject, objectToArray } from "@/lib/utils";

// export const runtime = "edge";

export async function generateMetadata({ params }: { params: { collectionId: string } }) {
	const collections = await getCollectionPagesCache();

	const preparedCollections = objectToArray(collections.collectionPages);

	const foundCollection: any = preparedCollections.find(
		(collection) => collection.handle === params.collectionId,
	);
	return {
		robots: {
			index: false,
		},
		title: foundCollection.title,
		description: foundCollection.description,
		openGraph: {
			title: foundCollection.title,
			description: foundCollection.description,
			type: "website",
			url: `https://demo.asttero.dev/collections/${foundCollection.handle}`,
			images: [`https://demo.asttero.dev/products/${foundCollection.bannerImage.url}`],
		},
	};
}

export default async function CategoryPage({
	params,
	searchParams,
}: {
	params: { collectionId: string };
	searchParams: { page?: string };
}) {
	const { shared } = await fetchGraphQL({ query: getWishlistQuery });
	const collections = await getCollectionPagesCache();

	const preparedCollections = objectToArray(collections.collectionPages);

	const foundCollection: any = preparedCollections.find(
		(collection) => collection.handle === params.collectionId,
	);

	console.log(foundCollection);

	const productss: any = await getPreparedProducts();

	const productsToArray = objectToArray(productss.productPages);

	const products = productsToArray.filter((product) =>
		foundCollection.products.includes(product.id),
	);

	const { subCollections, bannerImage, title, description } = foundCollection;
	const brands = countBrands(products);

	const preparedFilterParams = prepareFiltersUrlParamsToObject(searchParams);
	const bestseller = products.reduce((maxProduct, currentProduct) => {
		return currentProduct.rating.amount > maxProduct.rating.amount ? currentProduct : maxProduct;
	}, products[0]);

	return (
		<>
			<HeaderSection subCollections={subCollections} products={productsToArray} />
			<HeroSection
				bannerImage={bannerImage}
				title={title}
				description={description}
				brands={brands}
			/>
			<ProductsSection
				products={products}
				initialPageNumber={searchParams.page ?? "1"}
				title={title}
				preparedFilterParams={preparedFilterParams}
			/>
			<BestSellerSection product={bestseller} />
			<WhatPeopleSaySection products={products.slice(0, 6)} />

			<MobileBottomPanelSection />
			<WishListSection products={productsToArray} wishlist={shared.wishlist} />
			<CartSection products={productsToArray} />
			<OutOfStockNotificationSection />
		</>
	);
}
