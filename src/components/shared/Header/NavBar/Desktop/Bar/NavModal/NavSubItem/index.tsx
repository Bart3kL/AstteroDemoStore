import Link from "next/link";

import type { NavSubItemProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const NavSubItem = ({ title, href }: NavSubItemProps) => {
	return (
		<Link className={wrapper} href={href}>
			{title}
		</Link>
	);
};
