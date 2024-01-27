import { Collections } from "@/components/homePage/Collections";

import type { CollectionsProps } from "@/components/homePage/Collections/types";

export const CollectionsSection = async ({ collections }: CollectionsProps) => {
	return (
		<section>
			<Collections collections={collections} />
		</section>
	);
};
