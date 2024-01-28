import { Recommendations } from "@/components/homePage/Recommendations";

import type { RecommendationsSectionProps } from "./types";

export const RecommendationsSection = async ({ recommendations }: RecommendationsSectionProps) => {
	return (
		<section>
			<Recommendations {...recommendations} />
		</section>
	);
};
