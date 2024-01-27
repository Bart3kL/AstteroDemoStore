import { Item } from "../Item";

import type { ItemsProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperInactive } = styles;

export const Items = ({ showLinks, navLinks, handleOpenLinks, handleToggleMenu }: ItemsProps) => {
	return (
		<ul className={cx(wrapper, showLinks.active && wrapperInactive)}>
			{navLinks.map((item, idx) => (
				<Item
					key={item.title + idx}
					{...item}
					handleOpenLinks={handleOpenLinks}
					handleToggleMenu={handleToggleMenu}
				/>
			))}
		</ul>
	);
};
