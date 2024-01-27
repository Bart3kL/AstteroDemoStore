import { usePathname } from "next/navigation";

import { Results } from "./Results";

import type { SearchBarProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";
import { useSearchResults } from "./hooks";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperIsCollectionPage,
	wrapperInput,
	wrapperResults,
	wrapperResultsActive,
	wrapperResultsHeader,
	wrapperResultsSuggestions,
} = styles;

export const Search = ({ isActive, modalAddRef, preparedProducts, searchData }: SearchBarProps) => {
	const pathname = usePathname();
	const { inputLabel, suggestionsLabel, suggestionsList, noResultsLabel } = searchData;
	const {
		handleCloseSearchResultsPopup,
		handleSearchTerm,
		filteredProducts,
		searchTerm,
		handleSubmit,
		isActiveSearchResultsPopup,
		resultsRef,
	} = useSearchResults(preparedProducts);

	return (
		<div
			className={cx(
				wrapper,
				isActive && wrapperActive,
				pathname.includes("collections") && wrapperIsCollectionPage,
			)}
			ref={modalAddRef}
		>
			<form className={wrapperInput} onSubmit={handleSubmit}>
				<input
					type="text"
					name="search"
					placeholder={inputLabel}
					autoComplete="off"
					onChange={handleSearchTerm}
					value={searchTerm}
				/>
				<p onClick={handleSubmit}>
					<Icons.SearchSVG />
				</p>
			</form>
			<div
				className={cx(wrapperResults, isActiveSearchResultsPopup && wrapperResultsActive)}
				ref={resultsRef}
			>
				<div>
					<div className={wrapperResultsHeader}>
						<h4>{suggestionsLabel}</h4>
						<button onClick={handleCloseSearchResultsPopup} aria-label="Close">
							<Icons.CloseSVG />
						</button>
					</div>
					<form onSubmit={handleSubmit} className={wrapperResultsSuggestions}>
						{suggestionsList.map((suggestion, idx) => (
							<input
								key={suggestion + idx}
								type="submit"
								value={suggestion}
								onFocus={handleSearchTerm}
							/>
						))}
					</form>
				</div>
				<Results searchResults={filteredProducts} noResultsLabel={noResultsLabel} />
			</div>
		</div>
	);
};
