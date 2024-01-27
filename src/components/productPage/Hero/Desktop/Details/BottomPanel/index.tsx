import { Options } from "@/components/shared/Options";
import { AddToCart } from "./AddToCart";

import { useMobileBottomPanel } from "./hooks";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperShown,
	wrapperContent,
	wrapperContentHeader,
	wrapperContentHeaderTitle,
	wrapperContentPrice,
	wrapperContentOptions,
} = styles;

export const BottomPanel = ({
	variants,
	currentVariant,
	title,
	rating,
	setCurrentVariant,
	handle,
	preparedOptions,
}: any) => {
	const { isShown } = useMobileBottomPanel();

	return (
		<div className={cx(wrapper, isShown && wrapperShown)}>
			<div className={wrapperContent}>
				<div className={wrapperContentHeader}>
					<h1 className={wrapperContentHeaderTitle}>{title}</h1>

					<div className={wrapperContentPrice}>
						<p>${Number(currentVariant.price.amount).toFixed(2)}</p>
						{Number(currentVariant.compareAtPrice?.amount) >
							Number(currentVariant.price.amount) && (
							<p>${Number(currentVariant.compareAtPrice?.amount).toFixed(2)}</p>
						)}
					</div>
				</div>
				<div className={wrapperContentOptions}>
					<Options
						preparedOptions={preparedOptions}
						title={title}
						rating={rating}
						setCurrentVariant={setCurrentVariant}
						currentVariant={currentVariant}
						variants={variants}
						handle={handle}
						hideHeader
						areBigSize
					/>
				</div>
				<AddToCart
					currentVariantId={currentVariant.id}
					quantityAvailable={currentVariant.quantityAvailable}
					currentVariantIsAvailableForSale={currentVariant.availableForSale}
				/>
			</div>
		</div>
	);
};
