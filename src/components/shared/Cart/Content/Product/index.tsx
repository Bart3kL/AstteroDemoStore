import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Options } from "./Options";
import { Quantity } from "./Quantity";
import { ActionsPanel } from "./ActionsPanel";

import { removeItem, addItem } from "@/lib/shopify/functions/cart/actions";
import { cx, getNumberAfterLastSlash } from "@/lib/utils";
import { removeEdgesAndNodes } from "@/lib/shopify/utils";
import { Icons } from "@/lib";
import { prepareProductOptions } from "@/components/shared/SingleProduct/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperBox,
	wrapperBoxContent,
	wrapperBoxContentLeftPart,
	wrapperBoxContentRightPart,
	wrapperBoxContentRightPartFirstLine,
	wrapperBoxContentRightPartFirstLineOptions,
	wrapperBoxContentRightPartFirstLineBadge,
	wrapperBoxContentRightPartFirstLineBadgeGreen,
	wrapperBoxContentRightPartFirstLineBadgeDarkPink,
	wrapperBoxContentRightPartTitle,
	wrapperBoxContentRightPartVariantTitle,
	wrapperBoxBottom,
	wrapperBoxBottomPrice,
	wrapperBoxBottomSaveChanges,
} = styles;

export const Product = ({
	merchandise: {
		id: merchandiseId,
		selectedOptions,
		product: { variants, tags, handle, options, title },
	},
	cost,
	id: lineId,
	saveChangesButtonLabel,
	quantity,
}: any) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [edit, setEdit] = useState(false);

	const preparedVariants = removeEdgesAndNodes(variants);

	const foundCurrentVariant = preparedVariants.find((variant) => {
		return selectedOptions.every((option: any) => {
			return variant.selectedOptions.some(
				(variantOption: any) =>
					variantOption.name === option.name && variantOption.value === option.value,
			);
		});
	});

	const [currentVariant] = useState(foundCurrentVariant);
	const [changedVariant, setChangedVariant] = useState(foundCurrentVariant);
	const [showOptions, setShowOptions] = useState(false);

	const preparedOptions = prepareProductOptions(options);

	return (
		<div className={wrapper}>
			<div className={wrapperBox}>
				<div className={wrapperBoxContent}>
					<div className={wrapperBoxContentLeftPart}>
						<Image src={changedVariant.image.url} alt={title} width={62} height={74} />
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
								aria-label="Close or more options"
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
						{!edit && (
							<p className={wrapperBoxContentRightPartVariantTitle}>{changedVariant.title}</p>
						)}
						{edit && (
							<Options
								preparedOptions={preparedOptions}
								preparedVariants={preparedVariants}
								setCurrentVariant={setChangedVariant}
								currentVariant={changedVariant}
							/>
						)}
					</div>
				</div>
				<div className={wrapperBoxBottom}>
					<div className={wrapperBoxBottomPrice}>
						{cost.totalAmount.amount === "0.0" ? (
							<>
								<p>0.00</p>

								<p>${changedVariant.price.amount}</p>
							</>
						) : (
							<>
								<p>${changedVariant.price.amount}</p>
								{Number(changedVariant.compareAtPrice?.amount) >
									Number(changedVariant.price.amount) && (
									<p>${changedVariant.compareAtPrice?.amount}</p>
								)}
							</>
						)}
					</div>
					{currentVariant.id !== changedVariant.id && (
						<div
							className={wrapperBoxBottomSaveChanges}
							onClick={() => {
								startTransition(async () => {
									const error = await removeItem(lineId);

									await addItem(changedVariant.id, quantity);

									if (error) {
										throw new Error(error.toString());
									}

									router.refresh();
								});
							}}
						>
							<button aria-label="Loading">
								{isPending ? <Icons.LoadingDotsSVG /> : saveChangesButtonLabel}
							</button>
						</div>
					)}
					<Quantity
						quantity={quantity}
						lineId={lineId}
						merchandiseId={merchandiseId}
						quantityAvailable={changedVariant.quantityAvailable}
					/>
				</div>
			</div>
			<ActionsPanel
				showOptions={showOptions}
				setEdit={setEdit}
				edit={edit}
				lineId={lineId}
				resetChangedVariantToDefault={() => setChangedVariant(foundCurrentVariant)}
			/>
		</div>
	);
};
