export interface SliderProps {
	slides: {
		buttonLabel: string;
		redirection: string;
		textFirstLine: string;
		textSecondLine: string;
		mobileMedia: {
			src: string;
			alt: string;
		};
		desktopMedia: {
			src: string;
			alt: string;
		};
	}[];
}
