import Image from "next/image";
import Link from "next/link";

import type { ResultProps } from "./types";
import { cx, changeToFastImage } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperImage } = styles;

export const Result = ({ idx, title, images, handle, availableForSale }: ResultProps) => {
	return (
		<>
			{availableForSale && (
				<Link
					href={`/products/${handle}`}
					className={cx(wrapper, `keen-slider__slide number-slide-${idx}`)}
				>
					<div className={wrapperImage}>
						<Image
							src={changeToFastImage(images[0].url, 150, 180)}
							alt={changeToFastImage(images[0].altText, 150, 180)}
							width={150}
							height={180}
						/>

						<Image
							src={changeToFastImage(images[1].url, 150, 180)}
							alt={changeToFastImage(images[1].altText, 150, 180)}
							width={150}
							height={180}
						/>
					</div>
					<h5>{title}</h5>
				</Link>
			)}
		</>
	);
};
