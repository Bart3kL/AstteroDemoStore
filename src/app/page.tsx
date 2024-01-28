import { type Metadata } from "next";
import { Suspense } from "react";

import { HeaderSection } from "@/sections/shared/Header";
import { HeroSection } from "@/sections/homePage/Hero";
import { GuaranteesSection } from "@/sections/homePage/Guarantees";
import { CollectionsSection } from "@/sections/homePage/Collections";
import { NewAndDiscountProductsSection } from "@/sections/shared/NewAndDiscountProducts";
import { OutfitsSection } from "@/sections/homePage/Outfits";
import { RecommendationsSection } from "@/sections/homePage/Recommendations";
import { BottomCollectionsSection } from "@/sections/homePage/BottomCollections";
import { OurBrandsSection } from "@/sections/homePage/OurBrands";
import { InstagramSection } from "@/sections/homePage/Instagram";

//shared
import { WishListSection } from "@/sections/shared/WishList";
import { MobileBottomPanelSection } from "@/sections/shared/MobileBottomPanel";
import { CartSection } from "@/sections/shared/Cart";
import { OutOfStockNotificationSection } from "@/sections/shared/OutOfStockNotification";

import { getPreparedProducts } from "@/lib/shopify/functions/product/products";
import { objectToArray } from "@/lib/utils";
import { getHomePageQuery } from "@/lib/contentful/queries/homePage";
import { getWishlistQuery } from "@/lib/contentful/queries/shared";
import { fetchGraphQL } from "@/lib/contentful";

export const runtime = "edge";

export const metadata: Metadata = {
	robots: {
		index: false,
	},
	title: "Asttero - Demo Store",
	description:
		"Explore our online store builder services. We specialize in building online shops that drive sales and engage customers. Contact us for a free consultation!",
	openGraph: {
		title: "Asttero - Demo Store",
		description:
			"Explore our online store builder services. We specialize in building online shops that drive sales and engage customers. Contact us for a free consultation!",
		type: "website",
		url: "https://demo.asttero.dev",
		images: [
			"https://cdn.shopify.com/s/files/1/0830/0819/2813/files/slide-index1_ff1c6058-bea7-45d8-be96-f5e0ee6835e0.webp?v=1695900753",
		],
	},
};

export default async function Home() {
	const products = await getPreparedProducts();

	const productsToArray = objectToArray(products.productPages);

	const { allHomePage } = await fetchGraphQL({ query: getHomePageQuery });
	const { shared } = await fetchGraphQL({ query: getWishlistQuery });

	return (
		<>
			<HeaderSection products={productsToArray} />
			<HeroSection slides={allHomePage.heroSection} />
			<GuaranteesSection guarantees={allHomePage.guarantees} />
			<CollectionsSection collections={allHomePage.collections} />
			<Suspense>
				<NewAndDiscountProductsSection
					newAndDiscountProducts={allHomePage.newAndDiscountProducts}
					products={productsToArray}
				/>
				<OutfitsSection products={productsToArray} outfits={allHomePage.outfits} />
				<RecommendationsSection
					recommendations={allHomePage.recommendations}
					products={productsToArray}
				/>
				<BottomCollectionsSection collections={allHomePage.bottomCollections} />
				<OurBrandsSection ourBrands={allHomePage.ourBrands} />
				<InstagramSection instagram={allHomePage.instagram} />
			</Suspense>

			<MobileBottomPanelSection />
			<Suspense>
				<WishListSection wishlist={shared.wishlist} products={productsToArray} />
				<CartSection products={productsToArray} />
				<OutOfStockNotificationSection />
			</Suspense>
		</>
	);
}
