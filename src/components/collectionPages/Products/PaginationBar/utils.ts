import type { PaginationSettings } from "./types";

const labelMock = { label: "", isEllipsis: false };
const firstPageLabelMock = { ...labelMock, label: "1" };
const ellipsisLabelMock = { label: "...", isEllipsis: true };

const getPaginationProgress = (paginationSettings: PaginationSettings) => {
	const { pagesCount, siblingCount, activePageNumber } = paginationSettings;

	const isPaginationStart = activePageNumber - siblingCount * 2 < 1;
	const paginationStartLabel = isPaginationStart ? "start" : "";
	const isPaginationEnd = pagesCount - (activePageNumber + siblingCount) <= 1;
	const paginationEndLabel = isPaginationEnd ? "end" : "";
	const paginationProgress = paginationStartLabel || paginationEndLabel;

	return paginationProgress;
};

const getPaginationEndLabels = (
	activePageNumber: number,
	siblingCount: number,
	pagesCount: number,
) => {
	const rightSiblingCount = pagesCount - activePageNumber;
	const overallSiblingCount = rightSiblingCount + siblingCount;
	const firstLabelValue = activePageNumber - siblingCount;
	const labelsCount = overallSiblingCount + 1;

	const currentNumericLabels = Array.from(Array(labelsCount), (_, index) => {
		const label = `${firstLabelValue + index}`;
		return { ...labelMock, label };
	});

	currentNumericLabels.unshift(firstPageLabelMock, ellipsisLabelMock);

	return currentNumericLabels;
};

const getPaginationStartLabels = (
	activePageNumber: number,
	siblingCount: number,
	pagesCount: number,
) => {
	const leftSiblingCount = activePageNumber - 1;
	const overallSiblingCount = leftSiblingCount + siblingCount;
	const labelsCount = overallSiblingCount + 1;
	const lastPageLabel = { ...labelMock, label: `${pagesCount}` };

	const currentNumericLabels = Array.from(Array(labelsCount), (_, index) => {
		const label = `${index + 1}`;
		return { ...labelMock, label };
	});

	return currentNumericLabels.concat([ellipsisLabelMock, lastPageLabel]);
};

const getRegularLabels = (activePageNumber: number, siblingCount: number, pagesCount: number) => {
	const firstLabelValue = activePageNumber - siblingCount;
	const labelsCount = siblingCount * 2 + 1;
	const lastPageLabel = { ...labelMock, label: `${pagesCount}` };

	const currentNumericLabels = Array.from(Array(labelsCount), (_, index) => {
		const label = `${firstLabelValue + index}`;
		return { ...labelMock, label };
	});

	currentNumericLabels.unshift(firstPageLabelMock, ellipsisLabelMock);

	return currentNumericLabels.concat([ellipsisLabelMock, lastPageLabel]);
};

export const getPaginationLabels = ({
	activePageNumber,
	pagesCount,
	siblingCount,
}: PaginationSettings) => {
	const labelsCount = siblingCount * 2 + 1;

	if (pagesCount <= labelsCount)
		return Array.from(Array(pagesCount), (_, index) => ({
			...labelMock,
			label: `${index + 1}`,
		}));

	const paginationProgress = getPaginationProgress({
		activePageNumber,
		pagesCount,
		siblingCount,
	});

	switch (paginationProgress) {
		case "end":
			return getPaginationEndLabels(activePageNumber, siblingCount, pagesCount);
		case "start":
			return getPaginationStartLabels(activePageNumber, siblingCount, pagesCount);
		default:
			return getRegularLabels(activePageNumber, siblingCount, pagesCount);
	}
};

export const getVisibleEntriesPerPage = (areBannersEnabled: boolean): number => {
	return areBannersEnabled ? 45 : 48;
};
