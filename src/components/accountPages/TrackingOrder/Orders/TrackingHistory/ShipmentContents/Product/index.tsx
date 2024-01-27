import Image from "next/image";

import { type ShipmentProduct } from "../../types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperDetails } = styles;

export const Product = ({
	variantImage,
	productName,
	variantName,
	quantity,
	productImage,
}: ShipmentProduct) => {
	return (
		<div className={wrapper}>
			<Image
				src={variantImage.length ? variantImage : productImage}
				alt={variantName.length ? variantName : productName}
				width={90}
				height={120}
			/>
			<div className={wrapperDetails}>
				<h3>
					{productName} - {variantName}
				</h3>
				<p>x{quantity}</p>
			</div>
		</div>
	);
};
