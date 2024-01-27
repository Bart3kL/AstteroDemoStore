export const quantityToColorHex = (quantity: number) => {
	const colorRange = 255;

	const grayValue = Math.max(0, 255 - Math.round(quantity * (colorRange / 10)));

	const colorHex = grayValue.toString(16).padStart(2, "0");

	return `#${colorHex}${colorHex}${colorHex}`;
};
