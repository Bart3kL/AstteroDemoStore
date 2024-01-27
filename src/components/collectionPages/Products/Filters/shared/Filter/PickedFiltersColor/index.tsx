import Image from "next/image";

import type { PickedFiltersColorProps } from "./types";
import { changeToFastImage } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperPickedItem, wrapperPickedItemPickedColor, wrapperPickedItemSeparator } =
	styles;

export const PickedFiltersColor = ({ colors }: PickedFiltersColorProps) => {
	return (
		<div className={wrapper}>
			{colors.reverse().map((color, idx) => (
				<div className={wrapperPickedItem} key={"PickedFiltersColor" + idx + color}>
					<Image
						className={wrapperPickedItemPickedColor}
						src={changeToFastImage(
							`https://cdn.shopify.com/s/files/1/0830/0819/2813/files/${color
								.replaceAll(" ", "")
								.toLowerCase()}.webp?v=1696342154`,
							24,
							24,
						)}
						alt={color}
						width={24}
						height={24}
					/>

					<span className={wrapperPickedItemSeparator}>/</span>
				</div>
			))}
		</div>
	);
};
