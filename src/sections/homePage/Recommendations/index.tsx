import { Recommendations } from "@/components/homePage/Recommendations";

import type { RecommendationsSectionProps } from "./types";

export const RecommendationsSection = async ({
	products,
	recommendations,
}: RecommendationsSectionProps) => {
	const recommendationsWithProducts = {
		...recommendations,
		products: products.filter((product) => recommendations.products.includes(product.id)),
	};

	return (
		<section>
			<Recommendations {...recommendationsWithProducts} />
		</section>
	);
};
