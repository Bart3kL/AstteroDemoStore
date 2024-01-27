import { Event } from "./Event";

import { type ShipmentJourneyPreviewProps } from "./types";
import { segregateAndSortByDate, formatDate } from "./utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperListByDate, wrapperListByDateDate, wrapperListByDateLine } = styles;

export const ShipmentJourneyPreview = ({ events }: ShipmentJourneyPreviewProps) => {
	const preparedEvents = segregateAndSortByDate(events.slice(-3));

	return (
		<div className={wrapper}>
			{preparedEvents.map((events, index) => {
				return (
					<ul key={events[0].date + index} className={wrapperListByDate}>
						<div className={wrapperListByDateDate}>
							<Icons.CheckMarkCircleIcon />
							<p>{formatDate(events[0].date)}</p>
							<div className={wrapperListByDateLine}>
								<Icons.DashedLineIcon />
							</div>
						</div>
						{events.map((event) => (
							<Event {...event} key={event.date} />
						))}
					</ul>
				);
			})}
		</div>
	);
};
