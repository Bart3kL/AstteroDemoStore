import Link from "next/link";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const SubCollection = ({ title, handle }: any) => {
	return (
		<Link href={handle} className={wrapper}>
			{title}
		</Link>
	);
};
