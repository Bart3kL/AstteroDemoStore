export interface CollectionsProps {
	collections: {
		title: string;
		handle: string;
		productsCount: number;
		image: { src: string };
	}[];
}
