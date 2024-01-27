import Link from "next/link";

import { useCopy } from "./hooks";
import { cx } from "@/lib/utils";

import type { SlideProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperCode, heartbeat } = styles;

export const Slide = ({ redirection, title, promotionCode }: SlideProps) => {
	const { handleCopyClick, isExploding } = useCopy(promotionCode ?? "");

	return (
		<div className={cx("keen-slider__slide", wrapper)}>
			{redirection ? (
				<Link href={redirection} dangerouslySetInnerHTML={{ __html: title }} />
			) : (
				<div className={wrapperCode}>
					{title}
					<p onClick={handleCopyClick} className={cx(isExploding && heartbeat)}>
						{promotionCode}
					</p>
				</div>
			)}
		</div>
	);
};
