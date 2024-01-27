import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Fuse from "fuse.js";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { createUrl } from "@/lib/utils";
import type { Product } from "@/lib/shopify/functions/product/types";

type FuseResult = {
	item: Omit<Product, "currency">;
	refIndex: number;
};

export const useSearchResults = (preparedProducts: Product[]) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [isActiveSearchResultsPopup, setIsActiveSearchResultsPopup] = useState(false);
	const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const resultsRef = useRef<HTMLDivElement>(null);

	const isNode = (target: EventTarget | null): target is Node => {
		return target !== null && target instanceof Node;
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				resultsRef.current &&
				isNode(event.target) &&
				!resultsRef.current.contains(event.target as Node)
			) {
				const newParams = new URLSearchParams(searchParams);
				setIsActiveSearchResultsPopup(false);
				setSearchTerm("");

				const param = newParams.get("search");

				if (param) {
					newParams.delete("search");
					router.push(createUrl(pathname, newParams));
				}
			}
		};
		document.addEventListener("mousedown", handleClickOutside, { passive: true });

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [pathname, router, searchParams]);

	const handleCloseSearchResultsPopup = useCallback(() => {
		setIsActiveSearchResultsPopup(false);
		setSearchTerm("");

		const newParams = new URLSearchParams(searchParams);
		newParams.delete("search");
		router.push(createUrl(pathname, newParams));
	}, [pathname, router, searchParams]);

	const fuse = useMemo(
		() =>
			new Fuse(preparedProducts, {
				keys: ["title"],
				shouldSort: true,
				threshold: 0.3,
			}),
		[preparedProducts],
	);

	const handleSearchTerm = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value;
		setSearchTerm(searchTerm);
		const newParams = new URLSearchParams(searchParams);
		newParams.set("search", searchTerm);

		if (searchTerm !== "") {
			router.push(createUrl(pathname, newParams));
		} else {
			newParams.delete("search");
			router.push(createUrl(pathname, newParams));
		}

		const filtered = fuse.search(searchTerm);
		let searchResult: Product[] = filtered.map((searchItem: FuseResult) => {
			return {
				...searchItem.item,
			};
		});
		setFilteredProducts(searchResult);
	};

	useEffect(() => {
		const searchParam = searchParams.get("search");
		if (searchParam !== null) {
			setIsActiveSearchResultsPopup(true);
			setSearchTerm(searchParam);
			const filtered = fuse.search(searchParam);
			let searchResult: Product[] = filtered.map((searchItem: FuseResult) => {
				return {
					...searchItem.item,
				};
			});
			setFilteredProducts(searchResult);
		}
	}, [searchParams, fuse]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
		e?.preventDefault();
		setIsActiveSearchResultsPopup(true);
	};

	return {
		handleCloseSearchResultsPopup,
		filteredProducts,
		searchTerm,
		isActiveSearchResultsPopup,
		handleSubmit,
		setIsActiveSearchResultsPopup,
		handleSearchTerm,
		resultsRef,
	};
};
