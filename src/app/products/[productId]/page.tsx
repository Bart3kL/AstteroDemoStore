import { cookies } from "next/headers";
import { Suspense } from "react";

import { HeaderSection } from "@/sections/shared/Header";
import { HeroSection } from "@/sections/productPage/Hero";
import { AdditionalInformationsSection } from "@/sections/productPage/AdditionalInformations";
import { YouMayAlsoLikeSection } from "@/sections/productPage/YouMayAlsoLike";
import { CustomersAlsoPurchasedSection } from "@/sections/productPage/CustomersAlsoPurchased";
import { RecentlyViewedSection } from "@/sections/productPage/RecentlyViewed";

//shared
import { Loading } from "@/sections/shared/Loading";
import { WishListSection } from "@/sections/shared/WishList";
import { MobileBottomPanelSection } from "@/sections/shared/MobileBottomPanel";
import { CartSection } from "@/sections/shared/Cart";
import { OutOfStockNotificationSection } from "@/sections/shared/OutOfStockNotification";

import { type Product } from "@/lib/shopify/functions/product/types";
import { getCollectionPagesCache } from "@/lib/shopify/functions/collection/collection";
import { getPreparedProducts } from "@/lib/shopify/functions/product/products";
import { getNumberAfterLastSlash, checkIfProductHasBundle, objectToArray } from "@/lib/utils";
import { fetchGraphQL } from "@/lib/contentful";
import { getHomePageQuery } from "@/lib/contentful/queries/homePage";
import { getWishlistQuery } from "@/lib/contentful/queries/shared";

// export const runtime = "edge";

export async function generateMetadata({ params }: { params: { productId: string } }) {
	const products: any = await getPreparedProducts();

	const productsToArray = objectToArray(products.productPages);
	const currentProduct: any = productsToArray.find(
		(product) => product.handle === params.productId,
	);

	return {
		robots: {
			index: false,
		},
		title: currentProduct.title,
		description: currentProduct.description,
		openGraph: {
			title: currentProduct.title,
			description: currentProduct.description,
			type: "website",
			url: `https://demo.asttero.dev/products/${currentProduct.handle}`,
			images: [`https://demo.asttero.dev/products/${currentProduct.featuredImage.url}`],
		},
	};
}

export default async function ProductPage({
	params,
	searchParams,
}: {
	params: { productId: string };
	searchParams: { variant: string };
}) {
	const { shared } = await fetchGraphQL({ query: getWishlistQuery });

	const products: any = await getPreparedProducts();

	const productsToArray = objectToArray(products.productPages);

	const { allHomePage } = await fetchGraphQL({ query: getHomePageQuery });

	const currentProduct: any = productsToArray.find(
		(product) => product.handle === params.productId,
	);

	const collections = await getCollectionPagesCache();

	const preparedCollections = objectToArray(collections.collectionPages);

	const currentCollection = preparedCollections.find(
		(collection: any) => collection.handle === currentProduct.collection.handle,
	);

	const youMayAlsoLikeProducts = productsToArray
		.filter((product) => currentCollection.products.includes(product.id))
		.slice(0, 8)
		.filter((product) => product.id !== currentProduct.id);

	const customersAlsoPurchased = productsToArray.filter((product: Product) =>
		currentProduct.customersAlsoPurchased.includes(product.id),
	);
	const cookieStore = cookies();
	const recentlyViewedProductsHandles = cookieStore.get("recentlyViewedProducts");

	const recentlyViewedProducts =
		recentlyViewedProductsHandles &&
		JSON.parse(recentlyViewedProductsHandles.value)
			.map((handle: string) => products.productPages[handle])
			.filter((product: Product) => product !== undefined)
			.filter((product: Product) => product.handle !== currentProduct.handle);

	const currentVariantId =
		searchParams.variant ??
		currentProduct.variants.find((variant: Product["variants"][0]) => variant.availableForSale).id;

	const currentVariant = currentProduct.variants.find(
		(variant: Product["variants"][0]) => getNumberAfterLastSlash(variant.id) === currentVariantId,
	);

	const hasBundle = checkIfProductHasBundle(currentProduct.id, allHomePage.outfits);

	const bundles = hasBundle && {
		products: productsToArray.filter((product: any) => hasBundle.products.includes(product.id)),
		freeProduct: productsToArray.find((product: any) => hasBundle.freeProduct === product.id),
	};

	return (
		<>
			<HeaderSection products={productsToArray} />
			<HeroSection product={currentProduct} currentVariant={currentVariant} bundles={bundles} />
			<AdditionalInformationsSection />

			<Suspense fallback={<Loading />}>
				<YouMayAlsoLikeSection products={youMayAlsoLikeProducts} />
			</Suspense>
			<Suspense fallback={<Loading />}></Suspense>
			<Suspense fallback={<Loading />}>
				<CustomersAlsoPurchasedSection products={customersAlsoPurchased} />
			</Suspense>
			<Suspense fallback={<Loading />}>
				<RecentlyViewedSection products={recentlyViewedProducts ?? []} />
			</Suspense>
			<Suspense fallback={<Loading />}>
				<MobileBottomPanelSection />
				<WishListSection wishlist={shared.wishlist} />
				<CartSection />
				<OutOfStockNotificationSection />
			</Suspense>
		</>
	);
}
