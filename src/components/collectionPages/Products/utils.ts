import { type Product } from "@/lib/shopify/functions/product/types";

export function setCollectionPageParamInQueryString(pageIndex: number) {
	if (typeof window !== "undefined" && "URLSearchParams" in window) {
		const searchParams = new URLSearchParams(window.location.search);

		if (pageIndex === 1) searchParams.delete("page");
		else searchParams.set("page", pageIndex.toString());

		const collectionPageParam = "?" + searchParams.toString();
		let newRelativePathQuery = window.location.pathname;
		if (window.location.pathname.includes("collections"))
			if (collectionPageParam !== "?") newRelativePathQuery += collectionPageParam;

		history.pushState(null, "", newRelativePathQuery);
	}
}

export const getCurrentPageProducts = (perPage: number, products: Product[], page: number) => {
	const sliceStartIdx = page === 1 ? 0 : (page - 1) * perPage;
	const sliceEndIdx = sliceStartIdx + perPage;

	const currentProducts = products.slice(sliceStartIdx, sliceEndIdx);

	return currentProducts;
};

export const getInitialPageIndex = () => {
	if (typeof window !== "undefined" && "URLSearchParams" in window) {
		const searchParams = new URLSearchParams(window.location.search);

		const pageNumber = Number(searchParams.get("page"));

		if (!Number.isFinite(pageNumber)) return 1;

		const initialPageNumber = pageNumber === 0 ? 1 : Math.abs(pageNumber);
		return initialPageNumber;
	}
	return 0;
};
