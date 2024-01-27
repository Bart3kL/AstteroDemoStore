export interface InstagramProps {
	instagram: {
		title: string;
		posts: {
			redirection: string;
			image: {
				url: string;
			};
		}[];
	};
}
