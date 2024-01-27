import { useEffect, useState } from "react";

import { BreadCrumbs } from "../../shared/BreadCrumbs";
import { Availability } from "../../shared/Availability";
import { Guarantees } from "../../shared/Guarantees";
import { ExtraInformations } from "../../shared/ExtraInformations";
import { AddToCart } from "../../shared/AddToCart";
import { Bundles } from "../../shared/Bundles";
import { PaymentsAndSocials } from "../../shared/PaymentsAndSocials";
import { Rating } from "../../../../shared/Rating";
import { Options } from "@/components/shared/Options";

import type { DetailsProps } from "./types";
import { cx } from "@/lib/utils";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";
import { useWindowWidth } from "@/lib/hooks/useWindowWidth";
import { Icons } from "@/lib";
import { prepareProductOptions } from "@/components/shared/SingleProduct/utils";

import styles from "./rwd.module.scss";
const {
	curtain,
	curtainShow,
	wrapper,
	wrapperActive,
	wrapperHeader,
	wrapperHeaderRight,
	wrapperHeaderLeftRating,
	wrapperHeaderRightArrow,
	wrapperHeaderLeft,
	wrapperHeaderLeftTitle,
	wrapperDetails,
	wrapperDetailsPrice,
	wrapperDetailsDescription,
	wrapperDetailsOptions,
} = styles;

export const Details = ({
	currentSlideIdx,
	imagesLength,
	setCurrentSlideIdx,
	mainInstanceRef,
	variants,
	currentVariant,
	title,
	breadCrumbs,
	description,
	rating,
	options,
	setCurrentVariant,
	handle,
	bundles,
}: DetailsProps) => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const animationInstant = { duration: 0, easing: (t: number) => t };
	const width = useWindowWidth();

	useBlockScroll(width < 1024 && !(currentSlideIdx === imagesLength - 1));

	const preparedOptions = prepareProductOptions(options);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		if (!(currentSlideIdx === imagesLength - 1)) {
			if (width < 1024) {
				window.scrollTo(0, 0);

				document.documentElement.style.overflow = "hidden";

				return () => {
					document.documentElement.style.overflow = "auto";
				};
			}
		}
	}, [currentSlideIdx, imagesLength, width]);

	return (
		<>
			{jsEnabled && (
				<>
					<div
						className={cx(curtain, currentSlideIdx === imagesLength - 1 && curtainShow)}
						onClick={() => {
							setCurrentSlideIdx(0);
							window.scrollTo(0, 0);
							if (mainInstanceRef.current) {
								mainInstanceRef.current.moveToIdx(0, true, animationInstant);
							}
						}}
					/>
					<div className={cx(wrapper, currentSlideIdx === imagesLength - 1 && wrapperActive)}>
						<div className={wrapperHeader}>
							<div className={wrapperHeaderLeft}>
								<BreadCrumbs breadCrumbs={breadCrumbs} />
								<h3 className={wrapperHeaderLeftTitle}>{title}</h3>
								<div className={wrapperHeaderLeftRating}>
									<Rating rating={rating.stars} amount={rating.amount} />
								</div>
							</div>
							<div className={wrapperHeaderRight}>
								<button
									aria-label="Arrow down"
									className={wrapperHeaderRightArrow}
									onClick={() => {
										setCurrentSlideIdx(0);
										window.scrollTo(0, 0);
										if (mainInstanceRef.current) {
											mainInstanceRef.current.moveToIdx(0, true, animationInstant);
										}
									}}
								>
									<Icons.ArrowDownSVG />
								</button>
							</div>
						</div>
						<div className={wrapperDetails}>
							<div className={wrapperDetailsPrice}>
								<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
								{Number(currentVariant.compareAtPrice?.amount) >
									Number(currentVariant.price.amount) && (
									<p>${Number(currentVariant.compareAtPrice?.amount).toFixed(2)}</p>
								)}
							</div>
							<p className={wrapperDetailsDescription}>{description}</p>
							<Availability
								quantityAvailable={currentVariant.quantityAvailable}
								title={currentVariant.title}
							/>
							<div className={wrapperDetailsOptions}>
								<Options
									preparedOptions={preparedOptions}
									title={title}
									rating={rating}
									setCurrentVariant={setCurrentVariant}
									currentVariant={currentVariant}
									variants={variants}
									handle={handle}
								/>
							</div>
							<AddToCart
								variants={variants}
								id={currentVariant.id}
								isBoom={true}
								quantityAvailable={currentVariant.quantityAvailable}
								currentVariantIsAvailableForSale={currentVariant.availableForSale}
							/>
							{bundles && <Bundles {...bundles} />}
							<Guarantees />
							<ExtraInformations title={title} image={currentVariant.image} />
							<PaymentsAndSocials />
						</div>
					</div>
				</>
			)}
		</>
	);
};
