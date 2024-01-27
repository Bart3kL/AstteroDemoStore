import { Hero } from "@/components/productPage/Hero";

import type { HeroProps } from "./types";

export const HeroSection = async ({ product, currentVariant, bundles }: HeroProps) => {
	return (
		<section>
			<Hero {...product} defaultCurrentVariant={currentVariant} bundles={bundles} />
		</section>
	);
};
