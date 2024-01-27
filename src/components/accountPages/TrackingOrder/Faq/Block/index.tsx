"use client";

import { useState } from "react";

import { Icons } from "@/lib";
import { cx } from "@/lib/utils";
import { type FaqProps } from "../types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperQuestion, wrapperAnswer, wrapperAnswerActive } = styles;

export const Block = ({ question, answer }: FaqProps["faqs"][0]) => {
	const [isActive, setIsActive] = useState(false);

	const handleChange = () => {
		setIsActive((prev) => !prev);
	};

	return (
		<div className={cx(wrapper)} onClick={handleChange}>
			<div className={wrapperQuestion}>
				<p>{question}</p>
				{isActive ? <Icons.MinusSVG /> : <Icons.PlusSVG />}
			</div>
			<div
				className={cx(wrapperAnswer, isActive && wrapperAnswerActive)}
				dangerouslySetInnerHTML={{ __html: answer }}
			/>
		</div>
	);
};
