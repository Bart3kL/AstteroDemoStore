import type { ChangeEvent } from "react";

export interface RangeSliderProps {
	min: number;
	max: number;
	maxValue: number;
	value: { min: number; max: number };
	setMinValue: (value: number) => void;
	setMaxValue: (value: number) => void;
	minValue: number;
	step: number;
	handleMinChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onMouseUp: () => void;
	onTouchEnd: () => void;
	areMobileFilters?: boolean;
}
