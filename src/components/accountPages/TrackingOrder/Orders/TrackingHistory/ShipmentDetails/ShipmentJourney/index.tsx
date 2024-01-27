import { useEffect } from "react";

import { Portal } from "@/components/shared/Modal/Portal";
import { Curtain } from "@/components/shared/Modal/Curtain";
import { Event } from "../ShipmentJourneyPreview/Event";

import { type ShipmentJourneyProps } from "./types";
import { cx } from "@/lib/utils";
import { segregateAndSortByDate, formatDate } from "../ShipmentJourneyPreview/utils";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperModal,
	wrapperModalClose,
	wrapperModalContent,
	wrapperModalActive,
	wrapperModalContentListByDate,
	wrapperModalContentListByDateDate,
	wrapperModalContentListByDateLine,
} = styles;

export const ShipmentJourney = ({
	events,
	showShipmentJourney,
	setShowShipmentJourney,
}: ShipmentJourneyProps) => {
	useEffect(() => {
		if (showShipmentJourney) {
			const originalBodyOverflow = document.body.style.overflow;
			const originalHtmlOverflow = document.documentElement.style.overflow;
			document.body.style.overflow = "hidden";
			document.documentElement.style.overflow = "hidden";

			return () => {
				document.body.style.overflow = originalBodyOverflow;
				document.documentElement.style.overflow = originalHtmlOverflow;
			};
		}
	}, [showShipmentJourney]);

	const preparedEvents = segregateAndSortByDate(events);
	return (
		<Portal>
			<div className={wrapper}>
				<Curtain
					show={showShipmentJourney}
					onClose={() => setShowShipmentJourney(false)}
					curtainClose={true}
					curtainColor={"black"}
				/>
				<div className={cx(wrapperModal, showShipmentJourney && wrapperModalActive)}>
					<div className={wrapperModalClose}>
						<button onClick={() => setShowShipmentJourney(false)} aria-label="Close">
							<Icons.CloseSVG />
						</button>
					</div>
					<div className={wrapperModalContent}>
						{preparedEvents.map((events, index) => {
							return (
								<ul key={events[0].date + index} className={wrapperModalContentListByDate}>
									<div className={wrapperModalContentListByDateDate}>
										<Icons.CheckMarkCircleIcon />
										<p>{formatDate(events[0].date)}</p>
										<div className={wrapperModalContentListByDateLine}>
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
				</div>
			</div>
		</Portal>
	);
};
