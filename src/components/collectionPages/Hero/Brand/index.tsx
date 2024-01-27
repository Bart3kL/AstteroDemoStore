"use client";

import Image from "next/image";

import type { BrandProps } from "./types";
import { useCollectionBrandFilters } from "@/lib/zustand/collection";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperImage, wrapperImageActive } = styles;

export const Brand = ({ amount, image, title }: BrandProps) => {
	const zustand = useCollectionBrandFilters();

	const toggleBrandFilter = (brand: string) => {
		if (zustand.brandFilters.includes(brand)) {
			zustand.setBrandFilters(zustand.brandFilters.filter((b) => b !== brand));
		} else {
			zustand.setBrandFilters([...zustand.brandFilters, brand]);
		}
	};

	return (
		<div className={wrapper}>
			<div
				className={cx(wrapperImage, zustand.brandFilters.includes(title) && wrapperImageActive)}
				onClick={() => toggleBrandFilter(title)}
			>
				{image && <Image src={image} alt={""} width={150} height={90} />}
			</div>
			<p>
				{amount} {amount === 1 ? "item" : "items"}
			</p>
		</div>
	);
};
