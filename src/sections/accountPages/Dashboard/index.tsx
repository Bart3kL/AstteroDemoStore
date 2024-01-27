import { Dashboard } from "@/components/accountPages/Dashboard";

import type { DashboardSectionProps } from "./types";
import { getCustomer } from "@/lib/shopify/functions/account/actions";

export const DashboardSection = async ({ accessToken }: DashboardSectionProps) => {
	const customerData = await getCustomer(accessToken);

	return (
		<section>
			<Dashboard {...customerData} />
		</section>
	);
};
