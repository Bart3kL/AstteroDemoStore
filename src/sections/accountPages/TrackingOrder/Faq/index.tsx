import { Faq } from "@/components/accountPages/TrackingOrder/Faq";

import { faqData } from "./mock";

export const FaqSection = async () => {
	return (
		<section>
			<Faq {...faqData} />
		</section>
	);
};
