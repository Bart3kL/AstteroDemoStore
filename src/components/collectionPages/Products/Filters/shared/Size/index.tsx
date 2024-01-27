import type { SizeProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperSize, wrapperSizeActive } = styles;

export const Size = ({ sizeFilters, toggleSizeFilter, availableSizes }: SizeProps) => {
	return (
		<div className={wrapper}>
			{availableSizes.map((size, idx) => (
				<button
					className={cx(wrapperSize, sizeFilters.includes(size) && wrapperSizeActive)}
					key={"size" + size + idx}
					onClick={() => toggleSizeFilter(size)}
				>
					{size}
				</button>
			))}
		</div>
	);
};
