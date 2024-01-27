import Link from "next/link";
import Image from "next/image";

import type { BrandProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Brand = ({ image, href }: BrandProps) => {
	return (
		<Link className={wrapper} href={href} aria-label="Brand logo">
			<Image
				src={image.src}
				alt={image.alt}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
			/>
		</Link>
	);
};
