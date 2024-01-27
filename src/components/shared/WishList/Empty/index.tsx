import Image from "next/image";

import type { WishlistProps } from "@/server/cache/shared/wishlist/types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent } = styles;

export const Empty = ({ description, icon, title }: WishlistProps["empty"]) => {
	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<Image src={icon} alt={title} width={133} height={100} />
				<h4>{title}</h4>
				<p>{description}</p>
			</div>
		</div>
	);
};
