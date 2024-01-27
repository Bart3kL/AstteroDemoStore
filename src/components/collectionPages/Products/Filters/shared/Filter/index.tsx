import { PickedFiltersDefault } from "./PickedFiltersDefault";
import { PickedFiltersColor } from "./PickedFiltersColor";
import { PickedFiltersPrice } from "./PickedFiltersPrice";

import type { FilterProps } from "./types";
import { cx } from "@/lib/utils";
import { useToggleNavigation, useMaxHeight } from "./hooks";

import styles from "./rwd.module.scss";
const { wrapper, wrapperButton, wrapperButtonOpened, wrapperButtonClosed, wrapperFilter } = styles;

export const Filter = ({
	children,
	title,
	filters,
	prices,
	isDesktop,
	highestPrice,
	lowestPrice,
}: FilterProps) => {
	const { activeNavItemIndex, handleActiveNavItem } = useToggleNavigation(isDesktop ? true : false);

	const { ref } = useMaxHeight<HTMLDivElement>(activeNavItemIndex);

	return (
		<div className={wrapper}>
			<button
				className={cx(
					wrapperButton,
					wrapperButtonClosed,
					activeNavItemIndex && wrapperButtonOpened,
				)}
				onClick={handleActiveNavItem}
			>
				{title}
				{filters && filters.length > 0 && (
					<>
						{title === "Color" || title === "Material" ? (
							<PickedFiltersColor colors={filters as string[]} />
						) : title === "Price" ? null : (
							<PickedFiltersDefault filters={filters} />
						)}
					</>
				)}
				{prices && lowestPrice && highestPrice && (
					<PickedFiltersPrice {...prices} highestPrice={highestPrice} lowestPrice={lowestPrice} />
				)}
			</button>
			<div className={wrapperFilter} ref={ref}>
				{children}
			</div>
		</div>
	);
};
