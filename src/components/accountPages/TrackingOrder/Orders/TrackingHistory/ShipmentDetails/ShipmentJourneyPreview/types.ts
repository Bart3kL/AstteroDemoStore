export interface ShipmentJourneyPreviewProps {
	events: EventProps[];
}

export type EventProps = {
	date: string;
	status: string;
	substatus: string;
	details: string;
	locationDisplay: string;
	city: string;
	state: string;
	zip: string;
	country: string;
};
