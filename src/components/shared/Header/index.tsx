"use client";

import { usePathname } from "next/navigation";

import { AnnouncementBar } from "./AnnouncementBar";
import { NavBar } from "./NavBar";
import { SubCollections } from "./SubCollections";

import type { HeaderProps } from "./types";
import { useMenu } from "./hooks";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperHidden, wrapperDesktop } = styles;

export const Header = ({
	announcementBarCache,
	preparedProducts,
	headerData,
	subCollections,
	cartQuantity,
}: HeaderProps) => {
	const { isHidden, changeHeaderBackground } = useMenu();

	const pathname = usePathname();

	const isNotHomePage = pathname !== "/";

	return (
		<header
			className={cx(
				wrapper,
				isHidden && wrapperHidden,
				(changeHeaderBackground || isNotHomePage) && wrapperDesktop,
			)}
		>
			<AnnouncementBar {...announcementBarCache} />
			<NavBar
				preparedProducts={preparedProducts}
				{...headerData}
				changeHeaderBackground={changeHeaderBackground}
				isNotHomePage={isNotHomePage}
				cartQuantity={cartQuantity}
			/>
			{subCollections && subCollections.length > 0 && (
				<SubCollections subCollections={subCollections} />
			)}
		</header>
	);
};
