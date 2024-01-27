export type PaginationBarButton = {
	isEllipsis: boolean;
	label: string;
};

export type PaginationSettings = {
	siblingCount: number;
	activePageNumber: number;
	pagesCount: number;
};

type UsePaginationProps = PaginationSettings & {
	handlePageChange: (pageNumber: number) => void;
};

export type UsePagination = (paginationSettings: UsePaginationProps) => {
	paginationLabels: PaginationBarButton[];
	handleScrollToCollectionProducts: () => void;
	goToPage: (pageNumber: number) => Promise<void>;
};

export interface PaginationBarProps {
	activePageNumber: number;
	showDesktopFilters: boolean;
	pagesCount: number;
	handlePageChange: (pageNumber: number) => void;
}
