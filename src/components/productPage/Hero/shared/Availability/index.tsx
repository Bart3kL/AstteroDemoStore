import type { DetailsProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperStatus,
	wrapperStatusQuantity,
	wrapperStatusQuantityDarkPink,
	wrapperStatusQuantityGreen,
} = styles;

export const Availability = ({ quantityAvailable, title }: DetailsProps) => {
	return (
		<div className={wrapper}>
			<p>Availability:</p>
			{quantityAvailable >= 10 && (
				<div className={wrapperStatus}>
					<div className={cx(wrapperStatusQuantity, wrapperStatusQuantityGreen)}>Many items</div>
					in stock of <p>{title}</p>
				</div>
			)}
			{quantityAvailable <= 9 && (
				<div className={wrapperStatus}>
					Hurry, only left{" "}
					<div className={cx(wrapperStatusQuantity, wrapperStatusQuantityDarkPink)}>
						{quantityAvailable} items
					</div>
					of
					<p> {title} </p>in stock!
				</div>
			)}
		</div>
	);
};
