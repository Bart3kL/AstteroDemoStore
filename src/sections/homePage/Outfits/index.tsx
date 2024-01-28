import { Outfits } from "@/components/homePage/Outfits";

import { type OutfitsSectionProps } from "./types";

export const OutfitsSection = async ({ outfits }: OutfitsSectionProps) => {
	return (
		<section>
			<Outfits {...outfits} />
		</section>
	);
};
