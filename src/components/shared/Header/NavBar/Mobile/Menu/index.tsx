import { useState } from "react";

import { Portal } from "../../../../Modal/Portal";
import { Curtain } from "../../../../Modal/Curtain";
import { NavLinks } from "./NavLinks";
import { Items } from "./Items";

import type { MenuProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive, wrapperExit, wrapperContent, wrapperContentTitle } = styles;

export const Menu = ({ showMenu, handleToggleMenu, navLinks }: MenuProps) => {
	const [showLinks, setShowLinks] = useState({ active: false, category: "" });

	const handleOpenLinks = (href: string) => {
		setShowLinks({ active: true, category: href });
	};
	const handleCloseLinks = () => {
		setShowLinks({ active: false, category: "" });
	};

	return (
		<Portal>
			<>
				<Curtain
					show={showMenu}
					onClose={handleToggleMenu}
					curtainClose={true}
					curtainColor={"black"}
				/>
				<div className={cx(wrapper, showMenu && wrapperActive)}>
					<div className={wrapperExit}>
						<button onClick={handleToggleMenu} aria-label="Close">
							<Icons.CloseSVG />
						</button>
					</div>
					<div className={wrapperContent}>
						<p className={wrapperContentTitle}>Menu</p>
						<Items
							navLinks={navLinks}
							showLinks={showLinks}
							handleOpenLinks={handleOpenLinks}
							handleToggleMenu={handleToggleMenu}
						/>
						<NavLinks
							navLinks={navLinks.filter((item) => item.href === showLinks.category)}
							showLinks={showLinks}
							handleCloseLinks={handleCloseLinks}
							handleToggleMenu={handleToggleMenu}
						/>
					</div>
				</div>
			</>
		</Portal>
	);
};
