import Image from "next/image";
import Link from "next/link";

import type { BottomCollectionProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperImage } = styles;

export const BottomCollection = ({ title, image, redirection }: BottomCollectionProps) => {
	return (
		<Link className={wrapper} href={redirection}>
			<div className={wrapperImage}>
				<Image src={image.url} alt={redirection} width={250} height={250} />
			</div>
			<h4>{title}</h4>
		</Link>
	);
};
