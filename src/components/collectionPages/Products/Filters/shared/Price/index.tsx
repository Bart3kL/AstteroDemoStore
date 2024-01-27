import { RangeSlider } from "./RangeSlider";

import type { PriceProps } from "./types";
import { usePriceBar } from "./hooks";

import styles from "./rwd.module.scss";
const { wrapper, wrapperInputs, wrapperInputsInput, wrapperInputsSpaceBetween } = styles;

export const Price = ({
	setMinPriceFilter,
	setMaxPriceFilter,
	currentMin,
	currentMax,
	minVal,
	maxVal,
	step,
	areMobileFilters,
}: PriceProps) => {
	const min = minVal;
	const max = Math.max(maxVal);
	const { handleMaxChange, handleMinChange, minValue, maxValue, value, setMinValue, setMaxValue } =
		usePriceBar(currentMin, currentMax, step);

	const onMouseUp = () => {
		setMinPriceFilter(value.min), setMaxPriceFilter(value.max);
	};
	const onTouchEnd = () => {
		setMinPriceFilter(value.min), setMaxPriceFilter(value.max);
	};

	return (
		<div className={wrapper}>
			<RangeSlider
				min={min}
				max={max}
				step={step}
				value={value}
				setMinValue={setMinValue}
				setMaxValue={setMaxValue}
				maxValue={maxValue}
				minValue={minValue}
				handleMinChange={handleMinChange}
				handleMaxChange={handleMaxChange}
				onMouseUp={onMouseUp}
				onTouchEnd={onTouchEnd}
				areMobileFilters
			/>
			<div className={wrapperInputs} style={areMobileFilters ? { marginTop: "3px" } : {}}>
				<div className={wrapperInputsInput}>
					<p>$</p>

					<input
						type="number"
						min={min}
						max={max}
						value={minValue}
						onChange={(e) => {
							handleMinChange(e);
							setMinPriceFilter(value.min), setMaxPriceFilter(value.max);
							setMinPriceFilter(value.min), setMaxPriceFilter(value.max);
						}}
					/>
				</div>
				<div className={wrapperInputsSpaceBetween}>-</div>
				<div className={wrapperInputsInput}>
					<p>$</p>

					<input
						type="number"
						min={min}
						max={max}
						value={maxValue}
						onChange={(e) => {
							handleMaxChange(e);
							setMinPriceFilter(value.min), setMaxPriceFilter(value.max);
						}}
					/>
				</div>
			</div>
		</div>
	);
};
