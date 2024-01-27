import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

import type { DiscountBannerProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperImage, wrapperImageBadge } = styles;

export const DiscountBanner = ({ title, image, idx, type, href }: DiscountBannerProps) => {
	return (
		<div className={cx(wrapper, `keen-slider__slide number-slide-${idx}`)}>
			<Link className={wrapperImage} href={href}>
				<Image src={image.src} width={255} height={300} alt={image.alt} />
				{type === "sale" && (
					<div className={wrapperImageBadge}>
						<Marquee gradient={false} speed={80}>
							<div>
								{title} <span>-20%</span>
							</div>
							<div>
								{title} <span>-20%</span>
							</div>
						</Marquee>
					</div>
				)}
			</Link>
		</div>
	);
};
