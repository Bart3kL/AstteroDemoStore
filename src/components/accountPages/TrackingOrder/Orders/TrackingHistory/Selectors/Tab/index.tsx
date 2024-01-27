import { type TabProps } from "./types";
import { cx } from "@/lib/utils";
import { changeStatusName, formatDate } from "./utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperDetails,
	wrapperStatus,
	wrapperArrow,
	wrapperArrowShowMore,
} = styles;

export const Tab = ({
	statusDetails,
	order,
	lineItems,
	setChosenTrackingCode,
	chosenTrackingCode,
	trackingCode,
	setShowMore,
	showMore,
	isOnlyOneOrder,
	isFirst,
}: TabProps) => {
	const handleClick = () => {
		if (isFirst && !showMore) {
			setShowMore(!showMore);

			return;
		}

		setChosenTrackingCode(trackingCode);
		setShowMore(false);
	};

	return (
		<div
			className={cx(wrapper, showMore && chosenTrackingCode === trackingCode && wrapperActive)}
			onClick={() => !isOnlyOneOrder && handleClick()}
		>
			<div className={wrapperDetails}>
				<h4>{order.name}</h4>
				<p>{formatDate(statusDetails.date)}</p>
				<p>{lineItems.map((item) => item.productName).join(", ")}</p>
			</div>
			<div className={wrapperStatus}>{changeStatusName(statusDetails.status)}</div>
			{!isOnlyOneOrder && isFirst && (
				<div className={cx(wrapperArrow, showMore && wrapperArrowShowMore)}>
					<Icons.ArrowDownSVG />
				</div>
			)}
		</div>
	);
};
