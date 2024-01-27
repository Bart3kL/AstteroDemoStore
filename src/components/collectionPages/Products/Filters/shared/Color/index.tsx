import Image from "next/image";

import { Tooltip } from "@/components/shared/Tooltip";

import type { ColorProps } from "./types";
import { changeToFastImage, cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperColor, wrapperColorActive } = styles;

export const Color = ({ colorFilters, toggleColorFilter, availableColors }: ColorProps) => {
	return (
		<div className={wrapper}>
			{availableColors.map((color, idx) => (
				<Tooltip content={color} key={"Color" + idx + color}>
					<button
						className={cx(wrapperColor, colorFilters.includes(color) && wrapperColorActive)}
						onClick={() => toggleColorFilter(color)}
						aria-label={color}
					>
						<Image
							src={changeToFastImage(
								`https://cdn.shopify.com/s/files/1/0830/0819/2813/files/${color
									.replaceAll(" ", "")
									.toLowerCase()}.webp?v=1696342154`,
								35,
								35,
							)}
							alt={color}
							width={35}
							height={35}
						/>
					</button>
				</Tooltip>
			))}
		</div>
	);
};
