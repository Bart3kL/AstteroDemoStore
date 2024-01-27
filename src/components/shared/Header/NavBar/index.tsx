import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

import type { NavBarProps } from "./types";

export const NavBar = ({
	preparedProducts,
	mobile,
	desktop,
	search,
	chat,
	changeHeaderBackground,
	isNotHomePage,
	cartQuantity,
}: NavBarProps) => {
	return (
		<div>
			<Mobile
				navLinks={mobile}
				searchData={search}
				chatData={chat}
				preparedProducts={preparedProducts}
			/>
			<Desktop
				navLinks={desktop}
				chatData={chat}
				searchData={search}
				preparedProducts={preparedProducts}
				changeHeaderBackground={changeHeaderBackground}
				isNotHomePage={isNotHomePage}
				cartQuantity={cartQuantity}
			/>
		</div>
	);
};
