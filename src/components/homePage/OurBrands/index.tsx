import { Brand } from "./Brand";

import type { OurBrandsPropss } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperBrands } = styles;

export const OurBrands = ({ title, description, brands }: OurBrandsPropss) => {
	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>{title}</h2>
			<p>{description}</p>
			<div className={wrapperBrands}>
				{brands.map((brand, idx) => (
					<Brand {...brand} key={brand.redirection + idx} />
				))}
			</div>
		</div>
	);
};
