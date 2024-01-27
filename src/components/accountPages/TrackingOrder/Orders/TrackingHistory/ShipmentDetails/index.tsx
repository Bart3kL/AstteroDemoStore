import { useState } from "react";

import { CurrentStatus } from "./CurrentStatus";
import { ShipmentJourneyPreview } from "./ShipmentJourneyPreview";
import { ShipmentJourney } from "./ShipmentJourney";

import { type ShipmentDetailsProps } from "./types";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperTitle,
	wrapperContent,
	wrapperContentTackingCode,
	wrapperContentDetails,
	wrapperContentBtn,
} = styles;

export const ShipmentDetails = ({
	order,
	carrierName,
	trackingCode,
	statusDetails,
	events,
	buttonLabel,
	statusLabels,
}: ShipmentDetailsProps) => {
	const [showShipmentJourney, setShowShipmentJourney] = useState(false);

	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>order {order.name}</h2>
			<div className={wrapperContent}>
				<div className={wrapperContentTackingCode}>
					<p>
						{carrierName} {trackingCode}
					</p>
				</div>
				<div className={wrapperContentDetails}>
					<CurrentStatus status={statusDetails.status} {...statusLabels} />
					<ShipmentJourneyPreview events={events} />
					<div className={wrapperContentBtn}>
						<button onClick={() => setShowShipmentJourney(true)}>{buttonLabel}</button>
					</div>
					<ShipmentJourney
						events={events}
						showShipmentJourney={showShipmentJourney}
						setShowShipmentJourney={setShowShipmentJourney}
					/>
				</div>
			</div>
		</div>
	);
};
