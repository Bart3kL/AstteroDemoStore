import { Rating } from "../../../../shared/Rating";
import Image from "next/image";
import { calculateTimeAgo } from "./utils";
import { Icons } from "@/lib";
import { type SlideProps } from "./types";

import styles from "./base.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentHeader,
	wrapperContentHeaderLeft,
	wrapperContentHeaderLeftImage,
	wrapperContentHeaderLeftDetails,
	wrapperContentHeaderLeftDetailsName,
	wrapperContentHeaderLeftDetailsRating,
	wrapperContentHeaderRight,
	wrapperContentMessage,
	wrapperContentMessageTitle,
	wrapperContentMessageDescription,
	wrapperContentProduct,
} = styles;

export const Slide = ({
	author,
	reviewRating,
	reviewDate,
	reviewMessage,
	reviewTitle,
	avatar,
	productVariantName,
	productName,
}: SlideProps) => {
	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<div className={wrapperContentHeader}>
					<div className={wrapperContentHeaderLeft}>
						<Image
							src={avatar}
							alt=""
							className={wrapperContentHeaderLeftImage}
							width={32}
							height={32}
						/>
						<div className={wrapperContentHeaderLeftDetails}>
							<p className={wrapperContentHeaderLeftDetailsName}>{author}</p>
							<div className={wrapperContentHeaderLeftDetailsRating}>
								<Rating rating={reviewRating} />
							</div>
						</div>
					</div>
					<div className={wrapperContentHeaderRight}>{calculateTimeAgo(reviewDate)}</div>
				</div>
				<div className={wrapperContentMessage}>
					<div
						className={wrapperContentMessageTitle}
						dangerouslySetInnerHTML={{ __html: reviewTitle }}
					/>
					<div
						className={wrapperContentMessageDescription}
						dangerouslySetInnerHTML={{ __html: reviewMessage }}
					/>
				</div>
				<div className={wrapperContentProduct}>
					<Icons.CartIcon />
					<div>
						<p>{productName}</p>
						<p>{productVariantName}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
