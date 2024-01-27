import { useState, useEffect, type ChangeEvent } from "react";

export const usePriceBar = (min: number, max: number, step: number) => {
	const [value, setValue] = useState({ min: min, max: max });
	const [minValue, setMinValue] = useState(value ? value.min : min);
	const [maxValue, setMaxValue] = useState(value ? value.max : max);

	const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newMinVal = Math.min(+e.target.value, maxValue - step);
		if (!value) setMinValue(newMinVal);
		setValue({ min: newMinVal, max: maxValue });
	};
	const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newMaxVal = Math.max(+e.target.value, minValue + step);
		if (!value) setMaxValue(newMaxVal);
		setValue({ min: minValue, max: newMaxVal });
	};

	useEffect(() => {
		setMinValue(min);
		setMaxValue(max);
	}, [min, max]);

	return {
		handleMaxChange,
		handleMinChange,
		minValue,
		maxValue,
		value,
		setMinValue,
		setMaxValue,
	};
};
