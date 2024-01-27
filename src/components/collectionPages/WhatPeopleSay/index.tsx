import { Mobile } from "./Mobile";
import { Review } from "./Review";

import type { WhatPeopleSayProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperDesktop, wrapperDesktopCenter } = styles;

export const WhatPeopleSay = ({ products }: WhatPeopleSayProps) => {
	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>What people say</h2>
			<p>Reviews of customers who bought these products</p>
			<Mobile products={products} />

			<div className={cx(wrapperDesktop, products.length < 3 && wrapperDesktopCenter)}>
				{products.map((product, idx) => (
					<Review key={idx + product.id} {...product} idx={idx} />
				))}
			</div>
		</div>
	);
};
