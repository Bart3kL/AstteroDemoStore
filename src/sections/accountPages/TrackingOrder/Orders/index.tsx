import { Orders } from "@/components/accountPages/TrackingOrder/Orders";

import { trackYourOrder, trackYourHistory } from "./mock";

export const OrdersSection = async () => {
	return (
		<section>
			<Orders trackYourOrder={trackYourOrder} trackYourHistory={trackYourHistory} />
		</section>
	);
};
