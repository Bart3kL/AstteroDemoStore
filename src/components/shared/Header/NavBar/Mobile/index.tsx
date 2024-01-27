import { useState } from "react";

import { Bar } from "./Bar";
import { Menu } from "./Menu";

import type { MobileProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Mobile = ({ navLinks, searchData, chatData, preparedProducts }: MobileProps) => {
	const [showMenu, setShowMenu] = useState(false);

	const handleToggleMenu = () => {
		setShowMenu(!showMenu);
	};

	return (
		<div className={wrapper}>
			<Bar
				handleToggleMenu={handleToggleMenu}
				preparedProducts={preparedProducts}
				searchData={searchData}
				chatData={chatData}
			/>
			<Menu showMenu={showMenu} handleToggleMenu={handleToggleMenu} navLinks={navLinks} />
		</div>
	);
};
