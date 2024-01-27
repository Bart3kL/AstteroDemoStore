import Image from "next/image";

import type { VariantOptionsProps } from "./types";
import { changeToFastImage, cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperColors, wrapperColorsValue, wrapperColorsValueActive } = styles;

export const ColorImagesOptions = ({
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

	const foundProducts = availableColors
		.map(
			(color) =>
				variants.find((product) => {
					const productColors = product.selectedOptions
						.filter((option) => option.name === "Color")
						.map((option) => option.value);

					return productColors.includes(color);
				})!,
		)
		.filter((product) => product !== undefined);

	return (
		<div className={wrapper}>
			<h4>
				{name}: <p>{actualColor}</p>
			</h4>

			<div className={wrapperColors}>
				{foundProducts.map((value) => {
					const color = value.selectedOptions.find((option) => option.name === "Color")!;
					return (
						<button
							aria-label={color.value}
							key={value.id}
							onClick={() => handleSetProductColor(color.value)}
							className={cx(
								wrapperColorsValue,
								color.value === actualColor && wrapperColorsValueActive,
							)}
						>
							<Image
								src={changeToFastImage(value.image.url, 200, 200)}
								alt={value.title}
								width={color.value === actualColor ? 80 : 94}
								height={color.value === actualColor ? 80 : 94}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};
