import { SingleBreadCrumb } from "./SingleBreadCrumb";

import type { BreadCrumbsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const BreadCrumbs = ({ breadCrumbs, title }: BreadCrumbsProps) => {
	const breadCrumbsArray = title ? [...breadCrumbs, { title }] : breadCrumbs;
	return (
		<div className={wrapper}>
			{breadCrumbsArray.map((breadCrumb, idx) => (
				<SingleBreadCrumb
					{...breadCrumb}
					key={breadCrumb.title + idx}
					isProductName={idx === breadCrumbs.length - 1}
				/>
			))}
		</div>
	);
};
