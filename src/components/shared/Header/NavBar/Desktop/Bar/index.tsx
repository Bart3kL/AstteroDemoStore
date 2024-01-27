import Link from "next/link";

import { Right } from "./Right";
import { NavItem } from "./NavItem";

import type { BarProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperLogo, wrapperLogoBlack, wrapperCenterNav } = styles;

export const Bar = ({
	navLinks,
	chatData,
	searchData,
	preparedProducts,
	changeHeaderBackground,
	isNotHomePage,
	cartQuantity,
}: BarProps) => {
	return (
		<div className={wrapper}>
			<Link
				aria-label="Asttero logo"
				className={cx(wrapperLogo, (changeHeaderBackground || isNotHomePage) && wrapperLogoBlack)}
				href="/"
			>
				<Icons.LogoDesktopSVG />
			</Link>
			<ul className={wrapperCenterNav}>
				{navLinks.map((item, idx) => (
					<NavItem key={item.title + idx} {...item} />
				))}
			</ul>
			<Right
				chatData={chatData}
				searchData={searchData}
				preparedProducts={preparedProducts}
				changeHeaderBackground={changeHeaderBackground}
				isNotHomePage={isNotHomePage}
				cartQuantity={cartQuantity}
			/>
		</div>
	);
};
