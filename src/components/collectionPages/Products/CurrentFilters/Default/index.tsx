import type { DefaultProps } from "./types";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Default = ({ filter, title, toggleFilter }: DefaultProps) => {
	return (
		<div className={wrapper} onClick={() => toggleFilter(filter)}>
			<Icons.CloseSVG />
			<p>{title}:</p>
			<p>{filter}</p>
		</div>
	);
};
