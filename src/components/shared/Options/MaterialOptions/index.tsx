import Image from "next/image";

import type { VariantOptionsProps } from "./types";
import { cx, changeToFastImage } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperMaterials,
	wrapperMaterialsBig,
	wrapperMaterialsValue,
	wrapperMaterialsValueActive,
} = styles;

export const MaterialOptions = ({
	values,
	name,
	setCurrentVariant,
	currentVariant,
	variants,
	areBigMaterial,
	isBundle,
}: VariantOptionsProps) => {
	const actualMaterial = currentVariant.selectedOptions.find((option) => option.name === "Material")
		?.value;
	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value;
	const actualSize = currentVariant.selectedOptions.find((option) => option.name === "Size")?.value;

	const availableMaterials = values.filter((material) => {
		const nextVariant = variants.find((singleVariant) => {
			const selectedMaterial = singleVariant.selectedOptions.find(
				(option) => option.name === "Material",
			)?.value;
			const selectedColor = singleVariant.selectedOptions.find((option) => option.name === "Color")
				?.value;
			const selectedSize = singleVariant.selectedOptions.find((option) => option.name === "Size")
				?.value;

			return (
				selectedMaterial === material &&
				selectedColor === actualColor &&
				selectedSize === actualSize
			);
		});
		return isBundle ? nextVariant?.availableForSale || false : nextVariant;
	});

	const handleSetProductMaterial = (materialName: string) => {
		const nextVariant = variants.find((singleVariant) => {
			const selectedMaterial = singleVariant.selectedOptions.find(
				(option) => option.name === "Material",
			)?.value;
			const selectedColor = singleVariant.selectedOptions.find((option) => option.name === "Color")
				?.value;
			const selectedSize = singleVariant.selectedOptions.find((option) => option.name === "Size")
				?.value;

			return (
				selectedMaterial === materialName &&
				selectedColor === actualColor &&
				selectedSize === actualSize
			);
		});
		if (nextVariant === undefined) return;

		const { image: _image, ...updatedNextVariant } = nextVariant;
		setCurrentVariant({ image: currentVariant.image, ...updatedNextVariant });
	};

	return (
		<div className={wrapper}>
			<h4>
				{name}: <p>{actualMaterial}</p>
			</h4>
			<div className={cx(wrapperMaterials, areBigMaterial && wrapperMaterialsBig)}>
				{availableMaterials.map((value) => {
					return (
						<button
							aria-label={value}
							key={value}
							className={cx(
								wrapperMaterialsValue,
								actualMaterial === value && wrapperMaterialsValueActive,
							)}
							onClick={() => handleSetProductMaterial(value)}
						>
							<Image
								src={changeToFastImage(
									`https://cdn.shopify.com/s/files/1/0830/0819/2813/files/${value
										.replaceAll(" ", "")
										.toLocaleLowerCase()}.webp?v=1696342154`,
									areBigMaterial ? 28 : 22,
									areBigMaterial ? 28 : 22,
								)}
								alt={value}
								width={value === actualMaterial ? 18 : 22}
								height={value === actualMaterial ? 18 : 22}
							/>
						</button>
					);
				})}
			</div>
		</div>
	);
};
