import { Bar } from "./Bar";

import { type DesktopProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Desktop = ({
	navLinks,
	chatData,
	searchData,
	preparedProducts,
	changeHeaderBackground,
	isNotHomePage,
	cartQuantity,
}: DesktopProps) => {
	return (
		<div className={wrapper}>
			<Bar
				navLinks={navLinks}
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
