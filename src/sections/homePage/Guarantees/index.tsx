import { Guarantees } from "@/components/homePage/Guarantees";

import type { GuaranteesProps } from "@/components/homePage/Guarantees/types";

export const GuaranteesSection = async ({ guarantees }: GuaranteesProps) => {
	return (
		<section>
			<Guarantees guarantees={guarantees} />
		</section>
	);
};
