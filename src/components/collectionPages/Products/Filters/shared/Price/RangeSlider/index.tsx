import { useEffect } from "react";

import type { RangeSliderProps } from "./types";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperInputsInput,
	wrapperControls,
	wrapperControlsControl,
	wrapperControlsRail,
	wrapperControlsRailInner,
} = styles;

export const RangeSlider = ({
	min,
	max,
	maxValue,
	value,
	setMinValue,
	setMaxValue,
	minValue,
	step,
	handleMinChange,
	handleMaxChange,
	onMouseUp,
	onTouchEnd,
	areMobileFilters,
}: RangeSliderProps) => {
	const minPos = ((minValue - min) / (max - min)) * 100;
	const maxPos = ((maxValue - min) / (max - min)) * 100;

	useEffect(() => {
		if (value) {
			setMinValue(value.min);
			setMaxValue(value.max);
		}
	}, [value, setMaxValue, setMinValue]);

	return (
		<div className={wrapper} style={areMobileFilters ? { paddingTop: "0px" } : {}}>
			<input
				className={wrapperInputsInput}
				type="range"
				value={minValue}
				min={min}
				max={max}
				step={step}
				onChange={handleMinChange}
				onMouseUp={onMouseUp}
				onTouchEnd={onTouchEnd}
			/>
			<input
				className={wrapperInputsInput}
				type="range"
				value={maxValue}
				min={min}
				max={max}
				step={step}
				onChange={handleMaxChange}
				onMouseUp={onMouseUp}
				onTouchEnd={onTouchEnd}
			/>
			<div className={wrapperControls}>
				<div className={wrapperControlsControl} style={{ left: `${minPos}%` }} />
				<div className={wrapperControlsRail}>
					<div
						className={wrapperControlsRailInner}
						style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
					/>
				</div>
				<div className={wrapperControlsControl} style={{ left: `${maxPos}%` }} />
			</div>
		</div>
	);
};
