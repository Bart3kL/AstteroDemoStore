import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ColorOptions } from "@/components/shared/Options/ColorOptions";
import { SizeOptions } from "@/components/shared/Options/SizeOptions";
import { MaterialOptions } from "@/components/shared/Options/MaterialOptions";
import { ActionsPanel } from "./ActionsPanel";

import type { ProductProps } from "./types";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { Icons } from "@/lib";
import { prepareProductOptions } from "@/components/shared/SingleProduct/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperBox,
	wrapperBoxContent,
	wrapperBoxContentLeftPart,
	wrapperBoxContentLeftPartPrice,
	wrapperBoxContentRightPart,
	wrapperBoxContentRightPartFirstLine,
	wrapperBoxContentRightPartFirstLineOptions,
	wrapperBoxContentRightPartFirstLineBadge,
	wrapperBoxContentRightPartFirstLineBadgeGreen,
	wrapperBoxContentRightPartFirstLineBadgeDarkPink,
	wrapperBoxContentRightPartTitle,
	wrapperBoxContentRightPartOptions,
	wrapperBoxContentSaveChanges,
} = styles;

export const Product = ({
	title,
	variants,
	handle,
	options,
	tags,
	variantInWishlist,
	addToWishList,
	removeFromWishList,
	handleDeleteSignleProductFromWishlist,
	saveChangesButtonLabel,
	handleToggle,
}: ProductProps) => {
	const router = useRouter();
	const [currentVariant, setCurrentVariant] = useState(variantInWishlist);
	const [showOptions, setShowOptions] = useState(false);

	const [dummyCurrentVariantBeforeRefresh, setDummyCurrentVariantBeforeRefresh] = useState(
		variantInWishlist.id,
	);

	const preparedOptions = prepareProductOptions(options);

	return (
		<div className={wrapper}>
			<div className={wrapperBox}>
				<div className={wrapperBoxContent}>
					<div className={wrapperBoxContentLeftPart}>
						<Image src={currentVariant.image.url} alt={title} width={62} height={74} />
						<div className={wrapperBoxContentLeftPartPrice}>
							<p>${currentVariant.price.amount}</p>
							{Number(currentVariant.compareAtPrice?.amount) >
								Number(currentVariant.price.amount) && (
								<p>${currentVariant.compareAtPrice?.amount}</p>
							)}
						</div>
					</div>
					<div className={wrapperBoxContentRightPart}>
						<div className={wrapperBoxContentRightPartFirstLine}>
							{tags.includes("new") && (
								<p
									className={cx(
										wrapperBoxContentRightPartFirstLineBadge,
										wrapperBoxContentRightPartFirstLineBadgeGreen,
									)}
								>
									{tags[0]}
								</p>
							)}
							{tags.includes("sale") ? (
								<p
									className={cx(
										wrapperBoxContentRightPartFirstLineBadge,
										wrapperBoxContentRightPartFirstLineBadgeDarkPink,
									)}
								>
									{tags[0]}
								</p>
							) : (
								<div />
							)}

							<button
								aria-label="Close or more"
								className={wrapperBoxContentRightPartFirstLineOptions}
								onClick={() => setShowOptions(!showOptions)}
							>
								{showOptions ? <Icons.CloseSVG /> : <Icons.MoreSVG />}
							</button>
						</div>
						<Link
							href={`/products/${handle}?variant=${getNumberAfterLastSlash(currentVariant.id)}`}
							className={wrapperBoxContentRightPartTitle}
						>
							{title}
						</Link>
						{preparedOptions.color && (
							<div className={wrapperBoxContentRightPartOptions}>
								<ColorOptions
									values={preparedOptions.color}
									name="Color"
									setCurrentVariant={setCurrentVariant}
									currentVariant={currentVariant}
									variants={variants}
								/>
							</div>
						)}
						{preparedOptions.size && (
							<div className={wrapperBoxContentRightPartOptions}>
								<SizeOptions
									values={preparedOptions.size}
									name="Size"
									setCurrentVariant={setCurrentVariant}
									currentVariant={currentVariant}
									variants={variants}
								/>
							</div>
						)}
						{preparedOptions.material && (
							<div className={wrapperBoxContentRightPartOptions}>
								<MaterialOptions
									values={preparedOptions.material}
									name="Material"
									setCurrentVariant={setCurrentVariant}
									currentVariant={currentVariant}
									variants={variants}
								/>
							</div>
						)}
					</div>
					{currentVariant.id !== dummyCurrentVariantBeforeRefresh && (
						<div
							className={wrapperBoxContentSaveChanges}
							onClick={(e) => {
								removeFromWishList(getNumberAfterLastSlash(dummyCurrentVariantBeforeRefresh));
								addToWishList(getNumberAfterLastSlash(currentVariant.id), e, true);
								setDummyCurrentVariantBeforeRefresh(currentVariant.id);
								router.refresh();
							}}
						>
							<button>{saveChangesButtonLabel}</button>
						</div>
					)}
				</div>
			</div>
			<ActionsPanel
				showOptions={showOptions}
				removeFromWishList={() =>
					removeFromWishList(getNumberAfterLastSlash(dummyCurrentVariantBeforeRefresh))
				}
				handleDeleteSignleProductFromWishlist={handleDeleteSignleProductFromWishlist}
				handleToggle={handleToggle}
				currentVariantId={dummyCurrentVariantBeforeRefresh}
				quantityAvailable={currentVariant.quantityAvailable}
				currentVariantIsAvailableForSale={currentVariant.availableForSale}
			/>
		</div>
	);
};
