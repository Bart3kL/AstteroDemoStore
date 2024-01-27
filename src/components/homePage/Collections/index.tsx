import { Collection } from "./Collection";

import type { CollectionsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent } = styles;

export const Collections = ({ collections }: CollectionsProps) => {
	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				{collections.map((collection, idx) => (
					<Collection key={collection.title + idx} {...collection} />
				))}
			</div>
		</div>
	);
};
