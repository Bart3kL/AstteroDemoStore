import type { SliderProps } from "../types";

export type SlideProps = SliderProps["slides"][0] & {
	idx: number;
	currentSlideIdx: number;
};
