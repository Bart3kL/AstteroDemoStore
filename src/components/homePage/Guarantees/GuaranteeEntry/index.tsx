import Image from "next/image";

import type { GuaranteesProps } from "../types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperIcon, wrapperText } = styles;

export const GuaranteeEntry = ({ title, description, icon }: GuaranteesProps["guarantees"][0]) => {
	return (
		<div className={wrapper}>
			<div className={wrapperIcon}>
				<Image src={icon} alt={title} width={37} height={37} />
			</div>
			<div className={wrapperText}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
};
