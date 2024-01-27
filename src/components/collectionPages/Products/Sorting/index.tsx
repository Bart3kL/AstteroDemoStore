import { useState } from "react";

import type { SortingProps } from "./types";
import { useSorting } from "./hooks";
import { cx } from "@/lib/utils";
import { sorting } from "@/lib/constants";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContainer,
	wrapperContainerButton,
	wrapperContainerButtonLabel,
	wrapperContainerButtonActive,
	wrapperDropdown,
	wrapperDropdownOpen,
	wrapperDropdownElement,
} = styles;

export const Sorting = ({ handleSort }: SortingProps) => {
	const { isDropdownOpen, toggleDropdown, sortAddRef } = useSorting();
	const [currentSorting, setCurrentSorting] = useState("");

	return (
		<div className={wrapper} ref={sortAddRef}>
			<div className={wrapperContainer}>
				<button
					className={cx(wrapperContainerButton, isDropdownOpen && wrapperContainerButtonActive)}
					onClick={toggleDropdown}
				>
					<span className={wrapperContainerButtonLabel}>
						{currentSorting ? currentSorting : "Sort by"}
					</span>

					<Icons.ArrowDownSVG />
				</button>
			</div>
			<div className={cx(wrapperDropdown, isDropdownOpen && wrapperDropdownOpen)}>
				<div>
					<div>
						{sorting.map((label, idx) => {
							return (
								<div className={wrapperDropdownElement} key={idx}>
									<button
										onClick={() => {
											handleSort(label.type);
											toggleDropdown();
											setCurrentSorting(label.title);
										}}
									>
										{label.title}
									</button>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
