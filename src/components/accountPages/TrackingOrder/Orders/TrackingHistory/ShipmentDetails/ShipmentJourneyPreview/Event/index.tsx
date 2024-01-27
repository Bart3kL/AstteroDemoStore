import { type ShipmentJourneyPreviewProps } from "../types";
import { formatHours } from "./utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperHour, wrapperLine, wrapperDetails } = styles;

export const Event = ({
	date,
	details,
	locationDisplay,
}: ShipmentJourneyPreviewProps["events"][0]) => {
	return (
		<li className={wrapper}>
			<p />
			<p className={wrapperHour}>{formatHours(date)}</p>
			<div className={wrapperLine}>
				<Icons.DashedLineIcon />
			</div>
			<div className={wrapperDetails}>
				<p>{details}</p>
				<p>{locationDisplay}</p>
			</div>
		</li>
	);
};
