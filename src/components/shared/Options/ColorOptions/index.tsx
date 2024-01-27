import Image from "next/image";

import type { VariantOptionsProps } from "./types";
import { changeToFastImage, cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperColors, wrapperColorsValue, wrapperColorsValueActive } = styles;

export const ColorOptions = ({
	values,
	name,
	setCurrentVariant,
	currentVariant,
	variants,
	isBundle,
}: VariantOptionsProps) => {
	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value;
	const actualSize = currentVariant.selectedOptions.find((option) => option.name === "Size")?.value;

	const availableColors = values.filter((color) => {
		const nextVariant = variants.find((singleVariant) => {
			const size = singleVariant.selectedOptions.find((option) => option.name === "Size")?.value;
			const colorValue = singleVariant.selectedOptions.find((option) => option.name === "Color")
				?.value;
			return size === actualSize && colorValue === color;
		});
		return isBundle ? nextVariant?.availableForSale || false : nextVariant;
	});

	const handleSetProductColor = (colorName: string) => {
		const nextVariant = variants.find((singleVariant) => {
			const size = singleVariant.selectedOptions.find((option) => option.name === "Size")?.value;
			const color = singleVariant.selectedOptions.find((option) => option.name === "Color")?.value;
			const isSizeSpecified = !(typeof size === "undefined");

			if (isSizeSpecified) return color === colorName && size === actualSize;
			return color === colorName;
		});
		if (nextVariant === undefined) return;

		setCurrentVariant(nextVariant);
	};

	return (
		<div className={wrapper}>
			<h4>
				{name}: <p>{actualColor}</p>
			</h4>

			<div className={wrapperColors}>
				{availableColors.map((value) => {
					return (
						<button
							aria-label={value}
							key={value}
							onClick={() => handleSetProductColor(value)}
							className={cx(
								wrapperColorsValue,
								value === actualColor && wrapperColorsValueActive,
								// !isAvailable && wrapperColorsValueDisabled,
							)}
						>
							<Image
								src={changeToFastImage(
									`https://cdn.shopify.com/s/files/1/0830/0819/2813/files/${value
										.replaceAll(" ", "")
										.toLocaleLowerCase()}.webp?v=1696342154`,
									22,
									22,
								)}
								alt={value}
								width={value === actualColor ? 18 : 22}
								height={value === actualColor ? 18 : 22}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};
