import { type ShipmentProps } from "../types";

export interface SelectorsProps {
	currentTrackingCode: string;
	setCurrentTrackingCode: (trackingCode: string) => void;
	sortedShipments: ShipmentProps[];
}
