import Image from "next/image";
import Link from "next/link";

import type { CollectionsProps } from "../types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperImage, wrapperProducts } = styles;

export const Collection = ({
	title,
	image,
	productsCount,
	handle,
}: CollectionsProps["collections"][0]) => {
	return (
		<Link className={wrapper} href={handle}>
			<div className={wrapperImage}>
				<Image src={image.src} alt={title} fill sizes="(max-width: 355px) 100vw" />
				<h4>{title}</h4>
			</div>
			<div className={wrapperProducts}>
				<p>{productsCount}</p>
				<p>Products</p>
			</div>
		</Link>
	);
};
