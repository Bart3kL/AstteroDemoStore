import { type OrdersProps } from "../types";

export type TrackYourOrderProps = OrdersProps["trackYourOrder"] & {
	isActive: boolean;
	handleFocus: () => void;
	orderId: string;
	handleOrderId: (e: any) => void;
	handleBlur: () => void;
	isError: boolean;
	isLoading: boolean;
	handleSubmit: (e: any) => void;
};
