import Image from "next/image";
import Link from "next/link";

import type { CategoryProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperImage } = styles;

export const Category = ({ title, image, href, idx }: CategoryProps) => {
	return (
		<div className={cx(wrapper)}>
			<h5 className={wrapperTitle}>{title}</h5>
			<div className={wrapperImage}>
				<Link href={href} aria-label={title}>
					<Image src={image.src} width={200} height={200} alt={image.alt} />
				</Link>
			</div>
			<h5 className={wrapperTitle}>{idx === 1 && "Popular Brands"}</h5>
		</div>
	);
};
