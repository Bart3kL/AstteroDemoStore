"use client";

import { useState } from "react";

import { Description } from "./Descripton";
import { Reviews } from "./Reviews";

import { cx } from "@/lib/utils";
import { data } from "@/components/shared/SingleProduct/Modal/mock";

import styles from "./rwd.module.scss";
const { wrapper, wrapperHeader, wrapperHeaderBtn, wrapperHeaderBtnActive } = styles;

export const AdditionalInformations = () => {
	const [currentTab, setCurrentTab] = useState("description");

	const { productSelect, reviewsData } = data;

	return (
		<div className={wrapper}>
			<div className={wrapperHeader}>
				<button
					className={cx(wrapperHeaderBtn, currentTab === "description" && wrapperHeaderBtnActive)}
					onClick={() => setCurrentTab("description")}
				>
					Description
				</button>
				<button
					className={cx(wrapperHeaderBtn, currentTab === "reviews" && wrapperHeaderBtnActive)}
					onClick={() => setCurrentTab("reviews")}
				>
					Reviews
				</button>
			</div>
			<Description currentTab={currentTab === "description"} />
			<Reviews {...productSelect} reviewsData={reviewsData} currentTab={currentTab === "reviews"} />
		</div>
	);
};
