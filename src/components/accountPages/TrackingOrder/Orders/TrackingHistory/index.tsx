import { useState } from "react";

import { Selectors } from "./Selectors";
import { ShipmentDetails } from "./ShipmentDetails";
import { ShipmentContents } from "./ShipmentContents";

import { type TrackingHistoryProps } from "./types";
import { compareStatus } from "./utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle } = styles;

export const TrackingHistory = ({ shipments, trackYourHistory }: TrackingHistoryProps) => {
	const sortedShipments = shipments.sort(compareStatus);
	const [currentTrackingCode, setCurrentTrackingCode] = useState(sortedShipments[0].trackingCode);

	const currentOrder = sortedShipments.filter(
		(shipment) => shipment.trackingCode === currentTrackingCode,
	)[0];

	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>{trackYourHistory.title}</h2>
			<Selectors
				currentTrackingCode={currentTrackingCode}
				setCurrentTrackingCode={setCurrentTrackingCode}
				sortedShipments={sortedShipments}
			/>
			<ShipmentDetails {...currentOrder} {...trackYourHistory} />
			<ShipmentContents
				title={trackYourHistory.shipmentContentsTitle}
				products={currentOrder.lineItems}
			/>
		</div>
	);
};
