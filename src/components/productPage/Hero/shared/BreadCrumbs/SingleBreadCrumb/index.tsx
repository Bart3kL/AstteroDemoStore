import Link from "next/link";

import type { SingleBreadCrumbProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperHide } = styles;

export const SingleBreadCrumb = ({ title, handle, isProductName }: SingleBreadCrumbProps) => {
	return (
		<div className={cx(wrapper, isProductName && wrapperHide)}>
			{handle ? (
				<Link href={handle}>
					{title} <Icons.ArrowRightSVG />
				</Link>
			) : (
				<p>{title}</p>
			)}
		</div>
	);
};
