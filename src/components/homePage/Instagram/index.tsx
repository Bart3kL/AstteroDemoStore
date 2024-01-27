import { Post } from "./Post";

import type { InstagramPropss } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperBrands } = styles;

export const Instagram = ({ title, posts }: InstagramPropss) => {
	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>{title}</h2>

			<div className={wrapperBrands}>
				{posts.map((brand, idx) => (
					<Post {...brand} key={brand.redirection + idx} idx={idx} />
				))}
			</div>
		</div>
	);
};
