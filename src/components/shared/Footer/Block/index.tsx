import Link from "next/link";

import { type BlockProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Block = ({ pages, title }: BlockProps) => {
	return (
		<div className={wrapper}>
			<h3>{title}</h3>
			{pages.map((page, idx) => (
				<div key={page.title + idx}>
					{page.redirection ? (
						<Link href={page.redirection}>{page.title}</Link>
					) : (
						<p key={page.title + idx}>{page.title}</p>
					)}
				</div>
			))}
		</div>
	);
};
