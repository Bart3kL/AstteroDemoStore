import { type EventProps } from "../ShipmentJourneyPreview/types";

export interface ShipmentJourneyProps {
	events: EventProps[];
	showShipmentJourney: boolean;
	setShowShipmentJourney: (value: boolean) => void;
}
