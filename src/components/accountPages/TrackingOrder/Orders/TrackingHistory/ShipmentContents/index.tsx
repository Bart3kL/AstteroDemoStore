import { Product } from "./Product";

import { type ShipmentContentsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent, wrapperContentTitle, wrapperContentProducts } = styles;

export const ShipmentContents = ({ title, products }: ShipmentContentsProps) => {
	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<div className={wrapperContentTitle}>{title}</div>
				<div className={wrapperContentProducts}>
					{products.map((product, idx) => (
						<Product {...product} key={product.productName + idx} />
					))}
				</div>
			</div>
		</div>
	);
};
