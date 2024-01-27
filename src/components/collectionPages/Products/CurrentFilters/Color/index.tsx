import Image from "next/image";

import type { ColorProps } from "./types";
import { changeToFastImage } from "@/lib/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Color = ({ color, toggleColorFilter, title }: ColorProps) => {
	return (
		<button onClick={() => toggleColorFilter(color)} className={wrapper}>
			<Icons.CloseSVG />
			<p>{title}:</p>
			<Image
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
		</button>
	);
};
