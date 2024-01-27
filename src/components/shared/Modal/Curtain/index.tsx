import { cx } from "@/lib/utils";
import type { CurtainProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperShow, wrapperWhite, wrapperBlack } = styles;

export function Curtain({
	curtainClose = true,
	onClose,
	show,
	curtainColor = "white",
}: CurtainProps) {
	return (
		<div
			className={cx(
				wrapper,
				show && wrapperShow,
				curtainColor === "white" ? wrapperWhite : wrapperBlack,
			)}
			onClick={curtainClose ? () => onClose() : () => {}}
		/>
	);
}
