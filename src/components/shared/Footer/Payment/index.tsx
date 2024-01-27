import Image from "next/image";

import { type PaymentProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Payment = ({ image }: PaymentProps) => {
	return <Image width={42} height={26} src={image.url} alt="" className={wrapper} />;
};
