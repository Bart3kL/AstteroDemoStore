import { Hero } from "@/components/collectionPages/Hero";

import type { HeroProps } from "./types";

import { fetchGraphQL } from "@/lib/contentful";
import { getHomePageQuery } from "@/lib/contentful/queries/homePage";
import { matchImagesToBrands } from "./utils";

export const HeroSection = async ({ bannerImage, title, description, brands }: HeroProps) => {
	const { allHomePage } = await fetchGraphQL({ query: getHomePageQuery });

	const preparedBrands = matchImagesToBrands(brands, allHomePage.ourBrands);

	return (
		<section>
			<Hero
				bannerImage={bannerImage}
				title={title}
				description={description}
				brands={preparedBrands}
			/>
		</section>
	);
};
