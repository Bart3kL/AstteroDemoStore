import { WhatPeopleSay } from "@/components/collectionPages/WhatPeopleSay";

import type { WhatPeopleSayProps } from "./types";

export const WhatPeopleSaySection = async ({ products }: WhatPeopleSayProps) => {
	return (
		<section>
			<WhatPeopleSay products={products} />
		</section>
	);
};
