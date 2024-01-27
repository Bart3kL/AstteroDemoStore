import { Hero } from "@/components/homePage/Hero";

import { type HeroSectionProps } from "./types";

export const HeroSection = async ({ slides }: HeroSectionProps) => {
	return (
		<section>
			<Hero slides={slides} />
		</section>
	);
};
