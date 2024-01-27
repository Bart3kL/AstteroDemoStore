import Image from "next/image";
import Link from "next/link";

import type { BrandProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperImage } = styles;

export const Brand = ({ image, redirection }: BrandProps) => {
	return (
		<Link className={wrapper} href={`/collections/${redirection}`} aria-label="Brand ">
			<div className={wrapperImage}>
				<Image
					src={image}
					alt={""}
					width={250}
					height={90}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
		</Link>
	);
};
