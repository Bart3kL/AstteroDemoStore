import { SingleBreadCrumb } from "./SingleBreadCrumb";

import type { BreadCrumbsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const BreadCrumbs = ({ breadCrumbs, title }: BreadCrumbsProps) => {
	const breadCrumbsArray = [...breadCrumbs, { title }];
	return (
		<div className={wrapper}>
			{breadCrumbsArray.map((breadCrumb, idx) => (
				<SingleBreadCrumb {...breadCrumb} key={breadCrumb.title + idx} />
			))}
		</div>
	);
};
