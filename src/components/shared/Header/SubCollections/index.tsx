import { SubCollection } from "./SubCollection";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent } = styles;

export const SubCollections = ({ subCollections }: any) => {
	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				{subCollections.map((subCollection: any, idx: number) => (
					<SubCollection key={subCollection + idx} {...subCollection} />
				))}
			</div>
		</div>
	);
};
