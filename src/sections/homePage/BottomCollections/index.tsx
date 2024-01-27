import { BottomCollections } from "@/components/homePage/BottomCollections";

import type { BottomCollectionsCacheProps } from "./type";

export const BottomCollectionsSection = async ({
	collections,
}: {
	collections: BottomCollectionsCacheProps;
}) => {
	return (
		<section>
			<BottomCollections {...collections} />
		</section>
	);
};
