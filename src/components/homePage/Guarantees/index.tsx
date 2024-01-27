import { GuaranteeEntry } from "./GuaranteeEntry";

import type { GuaranteesProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Guarantees = ({ guarantees }: GuaranteesProps) => {
	return (
		<div className={wrapper}>
			{guarantees.map((guarantee, idx) => (
				<GuaranteeEntry key={guarantee.title + idx} {...guarantee} />
			))}
		</div>
	);
};
