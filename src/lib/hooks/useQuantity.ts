import { useState, useEffect } from "react";

export const useQuantity = (currentVariantId: string) => {
	const [quantity, setQuantity] = useState<number>(1);

	const decrementQuantity = () => setQuantity((prev) => (prev <= 1 ? 1 : prev - 1));
	const incrementQuantity = () => setQuantity(quantity + 1);

	useEffect(() => {
		setQuantity(1);
	}, [currentVariantId]);

	const quantityToColorHex = (quantity: number) => {
		const colorRange = 255;

		const grayValue = Math.max(0, 255 - Math.round(quantity * (colorRange / 10)));

		const colorHex = grayValue.toString(16).padStart(2, "0");

		return `#${colorHex}${colorHex}${colorHex}`;
	};

	return { quantity, decrementQuantity, incrementQuantity, setQuantity, quantityToColorHex };
};
