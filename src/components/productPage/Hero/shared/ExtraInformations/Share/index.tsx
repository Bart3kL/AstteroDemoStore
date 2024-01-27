import Link from "next/link";
import Image from "next/image";

import type { ShareProps } from "./types";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperProduct, wrapperSocials } = styles;

export const Share = ({ title, image }: ShareProps) => {
	return (
		<div className={wrapper}>
			<h3 className={wrapperTitle}>Share</h3>
			<div className={wrapperProduct}>
				<Image src={image.url} alt={title} width={300} height={300} />
				<h4>{title}</h4>
			</div>
			<div className={wrapperSocials}>
				<Link href="https://www.instagram.com/" target="_blank" aria-label="Instagram link">
					<Icons.InstagramSVG />
				</Link>
				<Link href="https://www.tiktok.com/" target="_blank" aria-label="TikTok link">
					<Icons.TiktokSVG />
				</Link>
				<Link href="https://twitter.com/" target="_blank" aria-label="X(Twitter) link">
					<Icons.XSVG />
				</Link>
			</div>
		</div>
	);
};
