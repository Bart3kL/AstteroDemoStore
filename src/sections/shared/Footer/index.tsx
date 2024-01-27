import { Footer } from "@/components/shared/Footer";

import { getFooterQuery } from "@/lib/contentful/queries/shared/index";
import { fetchGraphQL } from "@/lib/contentful";

export const FooterSection = async () => {
	const { shared } = await fetchGraphQL({ query: getFooterQuery });

	return (
		<footer>
			<Footer {...shared.footer} />
		</footer>
	);
};
