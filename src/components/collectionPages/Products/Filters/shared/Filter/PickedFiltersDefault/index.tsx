import type { PickedFiltersDefaultProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const PickedFiltersDefault = ({ filters }: PickedFiltersDefaultProps) => {
	const sortedState = filters.reverse().join(" / ");

	return <span className={wrapper}>{sortedState}</span>;
};
