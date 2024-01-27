export interface FooterProps {
	newsletterLabel: string;
	newsletterInputPlaceholder: string;
	copyright: string;
	description: string;
	payments: { image: { url: string } }[];
	blocks: {
		title: string;
		pages: {
			title: string;
			redirection: string;
		}[];
	}[];
}
