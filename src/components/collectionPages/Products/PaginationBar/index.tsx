import type { PaginationBarProps } from "./types";
import { usePaginationBar } from "./hooks";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperAreDesktopFilters,
	wrapperButton,
	wrapperButtonActive,
	wrapperPageNumber,
	wrapperPageNumbers,
	wrapperPageNumbersEllipsis,
} = styles;

export const PaginationBar = ({
	activePageNumber,
	pagesCount,
	handlePageChange,
	showDesktopFilters,
}: PaginationBarProps) => {
	const { handleScrollToCollectionProducts, paginationLabels } = usePaginationBar({
		pagesCount,
		activePageNumber,
		siblingCount: 2,
		handlePageChange,
	});
	const isPreviousButtonActive = activePageNumber > 1;
	const isNextButtonActive = activePageNumber < pagesCount;

	return (
		<div className={cx(wrapper, showDesktopFilters && wrapperAreDesktopFilters)}>
			<button
				aria-label="Arrow left"
				onClick={() => {
					if (isPreviousButtonActive) {
						handlePageChange(activePageNumber - 1);
						setTimeout(handleScrollToCollectionProducts, 20);
					}
				}}
				className={cx(wrapperButton, isPreviousButtonActive && wrapperButtonActive)}
			>
				<Icons.ArrowLeftSVG />
			</button>

			<div className={wrapperPageNumbers}>
				{paginationLabels.map(({ isEllipsis, label }, index) => {
					if (isEllipsis)
						return (
							<p key={label + index} className={wrapperPageNumbersEllipsis}>
								{label}
							</p>
						);

					const pageNumber = Number(label);
					const isCurrentlyActive = activePageNumber === pageNumber;

					return (
						<button
							key={label}
							className={wrapperPageNumber}
							onClick={() => {
								handlePageChange(pageNumber);
								if (!isCurrentlyActive) setTimeout(handleScrollToCollectionProducts, 20);
							}}
							disabled={isCurrentlyActive}
						>
							{label}
						</button>
					);
				})}
			</div>

			<button
				aria-label="Arrow right"
				onClick={() => {
					if (isNextButtonActive) {
						handlePageChange(activePageNumber + 1);
						setTimeout(handleScrollToCollectionProducts, 20);
					}
				}}
				className={cx(wrapperButton, isNextButtonActive && wrapperButtonActive)}
			>
				<Icons.ArrowRightSVG />
			</button>
		</div>
	);
};
