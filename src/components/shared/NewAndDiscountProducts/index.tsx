"use client";

import { useState } from "react";

import { GroupToggler } from "./GroupToggler";
import { Products } from "./Products";

import type { NewAndDiscountProductsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle } = styles;

export const NewAndDiscountProducts = ({
	newProducts,
	newTitle,
	saleProducts,
	saleTitle,
	title,
}: NewAndDiscountProductsProps) => {
	const [activeGroup, setActiveGroup] = useState(newTitle.toLowerCase());

	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>{title}</h2>
			<GroupToggler
				setActiveGroup={setActiveGroup}
				activeGroup={activeGroup}
				groups={[newTitle, saleTitle]}
			/>
			<Products
				products={activeGroup.toLowerCase() === newTitle.toLowerCase() ? newProducts : saleProducts}
				activeGroup={activeGroup}
			/>
		</div>
	);
};
