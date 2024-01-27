import type { FiltersProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperFilters, wrapperFiltersTopic, wrapperFiltersTopicActive } =
	styles;

export function Filters({
	topics,
	handleFilter,
	searchTerm,
	isFiltered,
	setIsFiltered,
	setSearchTerm,
	filterByLabel,
}: FiltersProps) {
	return (
		<div className={wrapper}>
			<p className={wrapperTitle}>{filterByLabel}</p>
			<ul className={cx(wrapperFilters)}>
				{topics.map((topic) => (
					<li
						key={topic.topicId}
						className={cx(
							wrapperFiltersTopic,
							isFiltered && searchTerm === topic.title && wrapperFiltersTopicActive,
						)}
						onClick={() => {
							handleFilter(topic.title);
							searchTerm === topic.title && setIsFiltered(false);
							searchTerm === topic.title && setSearchTerm("");
						}}
					>
						{searchTerm === topic.title && <Icons.ExitSVG />}
						{topic.title}
					</li>
				))}
			</ul>
		</div>
	);
}
