import React from "react";
import { usePathname } from "next/navigation";

import { Slide } from "./Slide";
import { Arrows } from "./Arrows";

import { cx } from "@/lib/utils";
import { useAutoplaySlider } from "@/lib/hooks/useAutoplaySlider";

import type { AnnouncementBarProps } from "./types";

import "./noJs.styles.scss";
import styles from "./rwd.module.scss";
const { wrapper, wrapperSlider, wrapperHideOnMobile } = styles;

export const AnnouncementBar = ({
	options: { backgroundColor, sliderSpeed, allowDrag, showArrows },
	slides,
}: AnnouncementBarProps) => {
	const pathname = usePathname();
	const { mainSliderRef, jsEnabled, handleBackSlide, handleNextSlide } = useAutoplaySlider({
		intervalInSeconds: Number(sliderSpeed),
		allowDrag,
	});

	return (
		<div
			className={cx(wrapper, pathname.includes("products") && wrapperHideOnMobile)}
			style={{
				backgroundColor,
			}}
		>
			<div ref={mainSliderRef} className={cx("keen-slider", wrapperSlider, !jsEnabled && "noJs")}>
				{slides.map((slide, idx) => (
					<Slide {...slide} key={slide.title + idx} />
				))}
			</div>
			{showArrows && <Arrows handleBackSlide={handleBackSlide} handleNextSlide={handleNextSlide} />}
		</div>
	);
};
