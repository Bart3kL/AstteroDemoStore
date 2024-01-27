import { useCallback, useMemo, useState, useEffect } from "react";

import type { UsePagination, PaginationBarButton } from "./types";
import { getPaginationLabels } from "./utils";

export const usePaginationBar: UsePagination = ({
	activePageNumber,
	pagesCount,
	siblingCount,
	handlePageChange,
}) => {
	const [paginationLabels, setPaginationLabels] = useState<PaginationBarButton[]>([]);

	const goToPage = useCallback(
		async (page: number) => {
			if (page > pagesCount || page < 1) return;
			handlePageChange(page);
		},
		[handlePageChange, pagesCount],
	);

	const paginationSettings = useMemo(
		() => ({
			siblingCount,
			pagesCount,
			activePageNumber,
		}),
		[siblingCount, pagesCount, activePageNumber],
	);

	useEffect(() => {
		const labels = getPaginationLabels({
			activePageNumber,
			pagesCount,
			siblingCount,
		});

		setPaginationLabels(labels);
	}, [
		activePageNumber,
		pagesCount,
		paginationSettings.activePageNumber,
		paginationSettings.pagesCount,
		siblingCount,
	]);

	const handleScrollToCollectionProducts = () => {
		const collectionProductsHeading = document.getElementById("collectionHero");
		const isCollectionProductsHeading = collectionProductsHeading !== null;
		if (!isCollectionProductsHeading) return;

		window.scrollTo(0, collectionProductsHeading.offsetTop - 130);
	};

	return { handleScrollToCollectionProducts, paginationLabels, goToPage };
};
