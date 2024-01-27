import { type ShipmentProps } from "./types";

export function compareStatus(a: ShipmentProps, b: ShipmentProps) {
	const statusOrder: Record<string, number> = {
		PRE_TRANSIT: 1,
		TRANSIT: 2,
		DELIVERED: 3,
	};

	const statusA = statusOrder[a.statusDetails.status];
	const statusB = statusOrder[b.statusDetails.status];

	return statusA - statusB;
}
