export interface ThumbSlideProps {
	image: string;
	idx: number;
	setCurrentImageIndex: (index: number) => void;
	currentImageIndex: number;
}
