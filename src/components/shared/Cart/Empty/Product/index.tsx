import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ColorOptions } from "@/components/shared/Options/ColorOptions";
import { SizeOptions } from "@/components/shared/Options/SizeOptions";
import { MaterialOptions } from "@/components/shared/Options/MaterialOptions";
import { AddToCart } from "./AddToCart";

import type { ProductProps } from "./types";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { prepareProductOptions } from "@/components/shared/SingleProduct/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperBox,
	wrapperBoxContent,
	wrapperBoxContentLeftPart,
	wrapperBoxContentLeftPartPrice,
	wrapperBoxContentRightPart,
	wrapperBoxContentRightPartFirstLine,
	wrapperBoxContentRightPartFirstLineBadge,
	wrapperBoxContentRightPartFirstLineBadgeGreen,
	wrapperBoxContentRightPartFirstLineBadgeDarkPink,
	wrapperBoxContentRightPartTitle,
	wrapperBoxContentRightPartOptions,
} = styles;

export const Product = ({ title, variants, handle, options, tags, idx }: ProductProps) => {
	const [currentVariant, setCurrentVariant] = useState(
		variants.find((variant) => variant.availableForSale)! ?? variants[0],
	);

	const preparedOptions = prepareProductOptions(options);

	return (
		<div className={cx(wrapper, `keen-slider__slide number-slide-${idx}`)}>
			<div className={wrapperBox}>
				<div className={wrapperBoxContent}>
					<div className={wrapperBoxContentLeftPart}>
						<Image src={currentVariant.image.url} alt={title} width={62} height={74} />
						<div className={wrapperBoxContentLeftPartPrice}>
							<p>${currentVariant.price.amount}</p>
							{Number(currentVariant.compareAtPrice?.amount) >
								Number(currentVariant.price.amount) && (
								<p>${currentVariant.compareAtPrice?.amount}</p>
							)}
						</div>
					</div>
					<div className={wrapperBoxContentRightPart}>
						<div className={wrapperBoxContentRightPartFirstLine}>
							{tags.includes("new") && (
								<p
									className={cx(
										wrapperBoxContentRightPartFirstLineBadge,
										wrapperBoxContentRightPartFirstLineBadgeGreen,
									)}
								>
									{tags[0]}
								</p>
							)}
							{tags.includes("sale") ? (
								<p
									className={cx(
										wrapperBoxContentRightPartFirstLineBadge,
										wrapperBoxContentRightPartFirstLineBadgeDarkPink,
									)}
								>
									{tags[0]}
								</p>
							) : (
								<div />
							)}
						</div>
						<Link
							href={`/products/${handle}?variant=${getNumberAfterLastSlash(currentVariant.id)}`}
							className={wrapperBoxContentRightPartTitle}
						>
							{title}
						</Link>
						{preparedOptions.color && (
							<div className={wrapperBoxContentRightPartOptions}>
								<ColorOptions
									values={preparedOptions.color}
									name="Color"
									setCurrentVariant={setCurrentVariant}
									currentVariant={currentVariant}
									variants={variants}
								/>
							</div>
						)}
						{preparedOptions.size && (
							<div className={wrapperBoxContentRightPartOptions}>
								<SizeOptions
									values={preparedOptions.size}
									name="Size"
									setCurrentVariant={setCurrentVariant}
									currentVariant={currentVariant}
									variants={variants}
								/>
							</div>
						)}
						{preparedOptions.material && (
							<div className={wrapperBoxContentRightPartOptions}>
								<MaterialOptions
									values={preparedOptions.material}
									name="Material"
									setCurrentVariant={setCurrentVariant}
									currentVariant={currentVariant}
									variants={variants}
								/>
							</div>
						)}
					</div>
				</div>
				<AddToCart
					variants={variants}
					id={currentVariant.id}
					isBoom={true}
					quantityAvailable={currentVariant.quantityAvailable}
					currentVariantIsAvailableForSale={currentVariant.availableForSale}
				/>
			</div>
		</div>
	);
};
