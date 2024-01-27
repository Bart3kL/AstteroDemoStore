import Link from "next/link";

import { Item } from "../Item";

import type { NavLinksProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperTitleActive, wrapperContent, wrapperContentActive } = styles;

export const NavLinks = ({
	showLinks,
	navLinks,
	handleCloseLinks,
	handleToggleMenu,
}: NavLinksProps) => {
	return (
		<ul className={wrapper}>
			<div className={cx(wrapperTitle, showLinks.active && wrapperTitleActive)}>
				<p onClick={handleCloseLinks}>
					<Icons.ArrowLeftSVG /> {navLinks.length > 0 && navLinks[0].title}
				</p>
				<Link href={navLinks.length > 0 ? navLinks[0].href : "/"} onClick={handleToggleMenu}>
					View all
				</Link>
			</div>
			<div className={cx(wrapperContent, showLinks.active && wrapperContentActive)}>
				{navLinks.length > 0 &&
					navLinks[0].subLinks?.map((item, idx) => (
						<Item
							key={item.title + idx}
							{...item}
							handleOpenLinks={() => {}}
							handleToggleMenu={handleToggleMenu}
						/>
					))}
			</div>
		</ul>
	);
};
