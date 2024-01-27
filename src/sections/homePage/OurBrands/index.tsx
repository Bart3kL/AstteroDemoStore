import { OurBrands } from "@/components/homePage/OurBrands";

import type { OurBrandsProps } from "./types";

export const OurBrandsSection = async ({ ourBrands }: OurBrandsProps) => {
	return (
		<section>
			<OurBrands {...ourBrands} />
		</section>
	);
};
