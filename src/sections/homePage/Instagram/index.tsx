import { Instagram } from "@/components/homePage/Instagram";

import { type InstagramProps } from "./types";

export const InstagramSection = async ({ instagram }: InstagramProps) => {
	return (
		<section>
			<Instagram {...instagram} />
		</section>
	);
};
