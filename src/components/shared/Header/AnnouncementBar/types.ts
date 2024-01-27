export interface AnnouncementBarProps {
	options: {
		backgroundColor: string;
		sliderSpeed: string;
		allowDrag: boolean;
		showArrows: boolean;
	};
	slides: {
		title: string;
		redirection?: string;
		promotionCode?: string;
		canBeDisplayed?: {
			show_from: string;
			show_to: string;
		};
	}[];
}
