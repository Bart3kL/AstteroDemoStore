import { Availability } from "../../shared/Availability";
import { Guarantees } from "../../shared/Guarantees";
import { BottomPanel } from "./BottomPanel";
import { ExtraInformations } from "../../shared/ExtraInformations";
import { AddToCart } from "../../shared/AddToCart";
import { PaymentsAndSocials } from "../../shared/PaymentsAndSocials";
import { Rating } from "../../../../shared/Rating";
import { Options } from "@/components/shared/Options";

import type { DetailsProps } from "./types";

import { prepareProductOptions } from "@/components/shared/SingleProduct/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperHeader,
	wrapperHeaderTitle,
	wrapperHeaderRating,
	wrapperContent,
	wrapperContentLeft,
	wrapperContentLeftPrice,
	wrapperContentLeftDescription,
	wrapperContentRight,
	wrapperContentRightOptions,
	wrapperGuarantees,
} = styles;

export const Details = ({
	variants,
	currentVariant,
	title,
	rating,
	setCurrentVariant,
	handle,
	options,
	description,
}: DetailsProps) => {
	const preparedOptions = prepareProductOptions(options);

	return (
		<div className={wrapper}>
			<PaymentsAndSocials />
			<BottomPanel
				preparedOptions={preparedOptions}
				variants={variants}
				currentVariant={currentVariant}
				title={title}
				rating={rating}
				setCurrentVariant={setCurrentVariant}
				handle={handle}
			/>
			<div className={wrapperHeader}>
				<h3 className={wrapperHeaderTitle}>{title}</h3>
				<div className={wrapperHeaderRating}>
					<Rating rating={rating.stars} amount={rating.amount} />
				</div>
			</div>
			<div className={wrapperContent}>
				<div className={wrapperContentLeft}>
					<div className={wrapperContentLeftPrice}>
						<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
						{Number(currentVariant.compareAtPrice?.amount) >
							Number(currentVariant.price.amount) && (
							<p>${Number(currentVariant.compareAtPrice?.amount).toFixed(2)}</p>
						)}
					</div>
					<Availability
						quantityAvailable={currentVariant.quantityAvailable}
						title={currentVariant.title}
					/>
					<p className={wrapperContentLeftDescription}>{description}</p>
					<ExtraInformations title={title} image={currentVariant.image} />
				</div>
				<div className={wrapperContentRight}>
					<div className={wrapperContentRightOptions}>
						<Options
							preparedOptions={preparedOptions}
							title={title}
							rating={rating}
							setCurrentVariant={setCurrentVariant}
							currentVariant={currentVariant}
							variants={variants}
							handle={handle}
							hideHeader
							colorsWithImages
							areBigSize
							areBigMaterial
						/>
					</div>
					<AddToCart
						variants={variants}
						id={currentVariant.id}
						isBoom={false}
						quantityAvailable={currentVariant.quantityAvailable}
						currentVariantIsAvailableForSale={currentVariant.availableForSale}
					/>
				</div>
			</div>
			<div className={wrapperGuarantees}>
				<Guarantees />
			</div>
		</div>
	);
};
