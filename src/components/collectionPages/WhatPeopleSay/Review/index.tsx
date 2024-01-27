import Link from "next/link";
import Image from "next/image";

import { Rating } from "../../../shared/Rating";

import type { ReviewProps } from "./types";
import { mockedReviews } from "./mock";

import styles from "./rwd.module.scss";
const { wrapper, wrapperAuthor, wrapperRating, wrapperProductName, wrapperReview } = styles;

export const Review = ({ title, handle, rating, featuredImage, idx }: ReviewProps) => {
	return (
		<Link href={`/products/${handle}`} className={wrapper}>
			<p className={wrapperAuthor}>{mockedReviews[idx].authorName}</p>
			<div className={wrapperRating}>
				<Rating rating={rating.stars} amount={rating.amount} />
			</div>
			<Image src={featuredImage.url} alt={""} width={130} height={130} />
			<h3 className={wrapperProductName}>{title}</h3>
			<p className={wrapperReview}>{mockedReviews[idx].review}</p>
		</Link>
	);
};
