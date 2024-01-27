import type { OrdersProps } from "../types";

export interface TrackingHistoryProps {
	shipments: ShipmentProps[];
	trackYourHistory: OrdersProps["trackYourHistory"];
}
export type ShipmentProps = {
	trackingCode: string;
	trackingUrl: string;
	eta: string;
	statusDetails: {
		date: string;
		details: string;
		status: string;
		substatus: string;
	};
	order: {
		id: string;
		name: string;
	};
	lineItems: ShipmentProduct[];
	events: {
		date: string;
		status: string;
		substatus: string;
		details: string;
		locationDisplay: string;
		city: string;
		state: string;
		zip: string;
		country: string;
	}[];
	carrierName: string;
	serviceLevel: {
		name: string;
		token: string;
	};
};

export type ShipmentProduct = {
	variantName: string;
	variantImage: string;
	productName: string;
	productImage: string;
	sku: string;
	quantity: number;
};
