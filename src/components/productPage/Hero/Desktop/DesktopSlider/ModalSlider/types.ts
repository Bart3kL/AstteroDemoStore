export interface ModalSliderProps {
	isActive: boolean;
	preparedImages: {
		type: string;
		id: string;
		src: string;
	}[];
	modalProps: {
		autoplayEnabled: boolean;
		progress: number;
		currentModalImageIndex: number;
		currentImageIndex: number;
		mixedMediaLength: number;
		handleModalClose: () => void;
		handleNextSlide: () => void;
		handlePreviousSlide: () => void;
		handleAutoplayEnable: () => void;
		handleAutoplayDisable: () => void;
	};
}
