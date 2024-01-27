"use client";

import React from "react";

import { Outfit } from "./Outfit";

import type { OutfitsProps } from "./types";
import { cx } from "@/lib/utils";
import { useMiscellaneousSlider, useMiscellaneousSliderDesktop } from "./hooks";

import "./styless.css";
import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperMobile, wrapperDesktop } = styles;

export const Outfits = ({ bundles, title }: OutfitsProps) => {
	const { sliderRef, handleSlideClickMobile } = useMiscellaneousSlider();
	const { sliderRefDesktop, handleSlideClick } = useMiscellaneousSliderDesktop();
	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>{title}</h2>
			<div className={cx("scene", wrapperMobile)}>
				<div className={"carousel keen-slider"} ref={sliderRef}>
					{bundles.map((bundle, idx) => (
						<Outfit
							{...bundle}
							idx={idx}
							key={bundle.products[0].id + idx}
							handleSlideClick={handleSlideClickMobile}
						/>
					))}
				</div>
			</div>
			<div className={cx("scene", wrapperDesktop)}>
				<div className={"carousel keen-slider"} ref={sliderRefDesktop}>
					{bundles.map((bundle, idx) => (
						<Outfit
							{...bundle}
							idx={idx}
							key={bundle.products[1].id + idx}
							handleSlideClick={handleSlideClick}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
