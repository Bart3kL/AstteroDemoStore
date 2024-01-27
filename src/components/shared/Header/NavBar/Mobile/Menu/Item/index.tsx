import Link from "next/link";
import { usePathname } from "next/navigation";

import type { ItemProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperTitleActive, wrapperTitleBadge, wrapperTitleBadgeGreen } =
	styles;

export const Item = ({
	title,
	href,
	subLinks,
	badge,
	handleOpenLinks,
	handleToggleMenu,
}: ItemProps) => {
	const pathname = usePathname();

	return (
		<li className={wrapper} onClick={() => subLinks && handleOpenLinks(href)}>
			<div className={cx(wrapperTitle, pathname === href && wrapperTitleActive)}>
				{subLinks ? (
					<p>{title}</p>
				) : (
					<Link href={href} onClick={handleToggleMenu}>
						{title}
					</Link>
				)}
				{badge && (
					<div className={cx(wrapperTitleBadge, badge == "Sale" && wrapperTitleBadgeGreen)}>
						{badge}
					</div>
				)}
			</div>
			{subLinks && <Icons.ArrowRightSVG />}
		</li>
	);
};
