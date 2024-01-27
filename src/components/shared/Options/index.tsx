import Link from "next/link";

import { ColorOptions } from "./ColorOptions";
import { ColorImagesOptions } from "./ColorImagesOptions";
import { MaterialOptions } from "./MaterialOptions";
import { SizeOptions } from "./SizeOptions";
import { Rating } from "../Rating";

import type { OptionsProps } from "./types";
import { getNumberAfterLastSlash } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperHeader, wrapperOption } = styles;

export const Options = ({
	preparedOptions,
	title,
	rating,
	setCurrentVariant,
	currentVariant,
	variants,
	hideHeader,
	handle,
	colorsWithImages,
	areBigSize,
	areBigMaterial,
	isBundle,
}: OptionsProps) => {
	return (
		<div className={wrapper}>
			{!hideHeader && (
				<div className={wrapperHeader}>
					<Rating rating={rating.stars} amount={rating.amount} />
					<h3>
						<Link
							href={`/products/${handle}?variant=${getNumberAfterLastSlash(currentVariant.id)}`}
						>
							{title}
						</Link>
					</h3>
				</div>
			)}
			{colorsWithImages ? (
				<>
					{preparedOptions.color && (
						<div className={wrapperOption}>
							<ColorImagesOptions
								values={preparedOptions.color}
								name="Color"
								setCurrentVariant={setCurrentVariant}
								currentVariant={currentVariant}
								variants={variants}
								isBundle={isBundle}
							/>
						</div>
					)}
				</>
			) : (
				<>
					{preparedOptions.color && (
						<div className={wrapperOption}>
							<ColorOptions
								values={preparedOptions.color}
								name="Color"
								setCurrentVariant={setCurrentVariant}
								currentVariant={currentVariant}
								variants={variants}
								isBundle={isBundle}
							/>
						</div>
					)}
				</>
			)}

			{preparedOptions.size && (
				<div className={wrapperOption}>
					<SizeOptions
						values={preparedOptions.size}
						name="Size"
						setCurrentVariant={setCurrentVariant}
						currentVariant={currentVariant}
						variants={variants}
						areBigSize={areBigSize}
						isBundle={isBundle}
					/>
				</div>
			)}
			{preparedOptions.material && (
				<div className={wrapperOption}>
					<MaterialOptions
						values={preparedOptions.material}
						name="Material"
						setCurrentVariant={setCurrentVariant}
						currentVariant={currentVariant}
						variants={variants}
						areBigMaterial={areBigMaterial}
						isBundle={isBundle}
					/>
				</div>
			)}
		</div>
	);
};
