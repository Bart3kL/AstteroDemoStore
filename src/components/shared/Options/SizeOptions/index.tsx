import type { VariantOptionsProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperSizes, wrapperSizesBig, wrapperSizesValue, wrapperSizesValueActive } =
	styles;

export const SizeOptions = ({
	values,
	name,
	setCurrentVariant,
	currentVariant,
	variants,
	areBigSize,
	isBundle,
}: VariantOptionsProps) => {
	const actualSize = currentVariant.selectedOptions.find((option) => option.name === "Size")?.value;
	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value;

	const availableSizes = values.filter((size) => {
		const nextVariant = variants.find((singleVariant) => {
			const color = singleVariant.selectedOptions.find((option) => option.name === "Color")?.value;
			const sizeValue = singleVariant.selectedOptions.find((option) => option.name === "Size")
				?.value;
			return color === actualColor && sizeValue === size;
		});
		return isBundle ? nextVariant?.availableForSale || false : nextVariant;
	});

	const handleSetProductSize = (sizeName: string) => {
		const nextVariant = variants.find((singleVariant) => {
			const color = singleVariant.selectedOptions.find((option) => option.name === "Color")?.value;
			const size = singleVariant.selectedOptions.find((option) => option.name === "Size")?.value;
			const isSizeSpecified = !(typeof color === "undefined");

			if (isSizeSpecified) return color === actualColor && size === sizeName;
			return size === sizeName;
		});
		if (nextVariant === undefined) return;

		const { image: _image, ...updatedNextVariant } = nextVariant;
		setCurrentVariant({ image: currentVariant.image, ...updatedNextVariant });
	};
	return (
		<div className={wrapper}>
			<h4>
				{name}: <p>{actualSize}</p>
			</h4>
			<div className={cx(wrapperSizes, areBigSize && wrapperSizesBig)}>
				{availableSizes.map((value) => {
					return (
						<button
							onClick={() => handleSetProductSize(value)}
							key={value}
							className={cx(wrapperSizesValue, actualSize === value && wrapperSizesValueActive)}
						>
							{value}
						</button>
					);
				})}
			</div>
		</div>
	);
};
