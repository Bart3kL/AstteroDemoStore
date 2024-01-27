import Image from "next/image";

import { Brand } from "./Brand";

import type { HeroTypeProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentBanner,
	wrapperContentBannerTitle,
	wrapperContentBannerTitleMen,
	wrapperContentDescription,
	wrapperContentDescriptionContent,
	wrapperContentDescriptionContentBrands,
} = styles;

export const Hero = ({ bannerImage, title, description, brands }: HeroTypeProps) => {
	return (
		<div className={wrapper} id="collectionHero">
			<div className={wrapperContent}>
				<div className={wrapperContentBanner}>
					<Image src={bannerImage.url} alt={title} fill />
					<h2
						className={cx(
							wrapperContentBannerTitle,
							(title === "Men" || title === "Accessories") && wrapperContentBannerTitleMen,
						)}
					>
						{title}
					</h2>
				</div>
				<div className={wrapperContentDescription}>
					<div className={wrapperContentDescriptionContent}>
						<h3>{title}</h3>
						<p>{description}</p>
						<div className={wrapperContentDescriptionContentBrands}>
							{brands.map((brand, idx) => (
								<Brand key={idx + brand.title} {...brand} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
