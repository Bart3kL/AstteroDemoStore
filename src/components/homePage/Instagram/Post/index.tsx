import Image from "next/image";
import Link from "next/link";

import type { PostProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperImage } = styles;

export const Post = ({ image, redirection, idx }: PostProps) => {
	return (
		<Link className={wrapper} href={redirection} aria-label={`Instagram post ${idx}`}>
			<div className={wrapperImage}>
				<Image src={image.url} alt={"1"} width={250} height={250} />
			</div>
		</Link>
	);
};
