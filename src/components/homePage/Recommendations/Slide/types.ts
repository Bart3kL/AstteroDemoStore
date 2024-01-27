export interface SlideProps {
	idx: number;
	featuredImage: {
		url: string;
		altText: string;
	};
	currentSlideIndexBeforeEnded: number;
	handleSlideClick: (v: number) => void;
}
