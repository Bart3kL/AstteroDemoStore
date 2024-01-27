import { cx } from "@/lib/utils";
import type { OptionProps } from "./types";

import styles from "./base.module.scss";
const { wrapper, wrapperLabelActive, wrapperLabelError, wrapperLabel } = styles;

export const Option = ({ idx, hasError, onChange, active, setActive }: OptionProps) => {
	return (
		<div className={wrapper}>
			<label
				className={cx(
					wrapperLabel,
					active === idx && wrapperLabelActive,
					hasError && wrapperLabelError,
				)}
				onClick={() => {
					onChange(idx + 1), setActive(idx);
				}}
			>
				{idx + 1}
			</label>
		</div>
	);
};
