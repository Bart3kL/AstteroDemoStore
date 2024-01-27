import Image from "next/image";

import type { BannerProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Banner = ({ src }: BannerProps) => {
	return (
		<div className={wrapper}>
			<Image src={src} alt="" fill />
		</div>
	);
};
