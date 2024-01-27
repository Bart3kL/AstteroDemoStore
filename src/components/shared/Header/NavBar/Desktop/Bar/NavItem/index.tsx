import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavModal } from "../NavModal";

import type { NavItemProps } from "./types";
import { cx } from "@/lib/utils";
import { useSubjectsMenu } from "./hooks";

import styles from "./rwd.module.scss";

const {
	wrapper,
	wrapperItem,
	wrapperItemActive,
	wrapperItemBadge,
	wrapperItemLine,
	wrapperItemLineActive,
	wrapperItemBadgeGreen,
} = styles;

export const NavItem = ({
	title,
	subLinks,
	href,
	badge,
	popularProducts,
	banners,
	brands,
}: NavItemProps) => {
	const pathname = usePathname();

	const { handleMouseLeave, handleOpenModal, isModalOpen, selectedSubLinks } = useSubjectsMenu();

	return (
		<li
			className={cx(wrapper, isModalOpen && wrapperItemActive)}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={() => subLinks && handleOpenModal(subLinks)}
		>
			<div className={wrapperItem}>
				{badge && (
					<span className={cx(wrapperItemBadge, badge === "New" && wrapperItemBadgeGreen)}>
						{badge}
					</span>
				)}
				<NavModal
					isModalOpen={isModalOpen}
					selectedSubLinks={selectedSubLinks}
					popularProducts={popularProducts}
					banners={banners}
					brands={brands}
				/>
				<Link href={href}>{title}</Link>
				<p className={cx(wrapperItemLine, pathname === href && wrapperItemLineActive)} />
			</div>
		</li>
	);
};
