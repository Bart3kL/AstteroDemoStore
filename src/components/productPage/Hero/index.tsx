"use client";

import { useState, useEffect } from "react";

import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

import type { HeroProps } from "./types";
import { getImagesByColor } from "./utils";
import { useRecentlyViewedProducts } from "@/lib/hooks/useRecentlyViewed";
import { setVariantParamInQueryString, getNumberAfterLastSlash } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Hero = ({
	title,
	variants,
	breadCrumbs,
	tags,
	description,
	rating,
	options,
	handle,
	defaultCurrentVariant,
	bundles,
}: HeroProps) => {
	const [isClient, setIsClient] = useState(false);
	const [currentVariant, setCurrentVariant] = useState(
		defaultCurrentVariant ?? variants.find((variant) => variant.availableForSale),
	);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const { addProductToRecentlyViewed } = useRecentlyViewedProducts();

	isClient && addProductToRecentlyViewed(handle);

	const actualColor = currentVariant.selectedOptions.find((option) => option.name === "Color")
		?.value!;
	const images = getImagesByColor(variants, actualColor);

	setVariantParamInQueryString(getNumberAfterLastSlash(currentVariant.id));
	return (
		<div className={wrapper}>
			<Mobile
				images={images}
				actualColor={actualColor}
				title={title}
				breadCrumbs={breadCrumbs}
				tags={tags}
				currentVariant={currentVariant}
				variants={variants}
				description={description}
				rating={rating}
				options={options}
				setCurrentVariant={setCurrentVariant}
				handle={handle}
				bundles={bundles}
			/>
			<Desktop
				images={images}
				actualColor={actualColor}
				title={title}
				breadCrumbs={breadCrumbs}
				tags={tags}
				currentVariant={currentVariant}
				variants={variants}
				description={description}
				rating={rating}
				options={options}
				setCurrentVariant={setCurrentVariant}
				handle={handle}
				bundles={bundles}
			/>
		</div>
	);
};
