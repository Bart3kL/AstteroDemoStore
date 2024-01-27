import { Outfits } from "@/components/homePage/Outfits";

import { type OutfitsSectionProps } from "./types";

export const OutfitsSection = async ({ products, outfits }: OutfitsSectionProps) => {
	const outfitBundles = {
		...outfits,
		bundles: outfits.bundles.map((bundle) => ({
			products: products.filter((product) => bundle.products.includes(product.id)),
			freeProduct: products.filter((product) => bundle.freeProduct === product.id)[0],
		})),
	};
	return (
		<section>
			<Outfits {...outfitBundles} />
		</section>
	);
};
