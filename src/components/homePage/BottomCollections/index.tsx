import { BottomCollection } from "./BottomCollection";

import type { BottomCollectionsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent } = styles;

export const BottomCollections = ({ collections }: BottomCollectionsProps) => {
	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				{collections.map((collection, idx) => (
					<BottomCollection {...collection} key={collection.redirection + idx} />
				))}
			</div>
		</div>
	);
};
