import { useState } from "react";

import type { TooltipProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperToolTip, wrapperToolTipActive } = styles;

export const Tooltip = ({ content, children }: TooltipProps) => {
	let timeout: any;
	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, 200);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div className={wrapper} onMouseEnter={showTip} onMouseLeave={hideTip}>
			{children}
			<div className={cx(wrapperToolTip, active && wrapperToolTipActive)}>{content}</div>
		</div>
	);
};
