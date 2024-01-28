import { type Metadata } from "next";

import { OrdersSection } from "@/sections/accountPages/TrackingOrder/Orders";
import { FaqSection } from "@/sections/accountPages/TrackingOrder/Faq";

//shared
import { HeaderSection } from "@/sections/shared/Header";
import { NewAndDiscountProductsSection } from "@/sections/shared/NewAndDiscountProducts";
import { MobileBottomPanelSection } from "@/sections/shared/MobileBottomPanel";
import { CartSection } from "@/sections/shared/Cart";
import { WishListSection } from "@/sections/shared/WishList";

import { getPreparedProducts } from "@/lib/shopify/functions/product/products";
import { getHomePageQuery } from "@/lib/contentful/queries/homePage";
import { objectToArray } from "@/lib/utils";
import { getWishlistQuery } from "@/lib/contentful/queries/shared";
import { fetchGraphQL } from "@/lib/contentful";

// export const runtime = "edge";

export const metadata: Metadata = {
	robots: {
		index: false,
	},
	title: "Tracking Order",
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

export default async function Login() {
	const products = await getPreparedProducts();

	const productsToArray = objectToArray(products.productPages);

	const { shared } = await fetchGraphQL({ query: getWishlistQuery });
	const { allHomePage } = await fetchGraphQL({ query: getHomePageQuery });
	return (
		<main>
			<HeaderSection products={productsToArray} />
			<OrdersSection />
			<FaqSection />

			<NewAndDiscountProductsSection newAndDiscountProducts={allHomePage.newAndDiscountProducts} />
			<MobileBottomPanelSection />
			<WishListSection wishlist={shared.wishlist} />
			<CartSection />
		</main>
	);
}
