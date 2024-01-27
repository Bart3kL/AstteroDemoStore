"use client";

import { TrackYourOrder } from "./TrackYourOrder";
import { TrackingHistory } from "./TrackingHistory";

import { type OrdersProps } from "./types";
import { useSearchInput } from "./hooks";

import styles from "./rwd.module.scss";
const { wrapper } = styles;

export const Orders = ({ trackYourOrder, trackYourHistory }: OrdersProps) => {
	const {
		isActive,
		handleFocus,
		orderId,
		handleOrderId,
		handleBlur,
		isError,
		handleSubmit,
		isLoading,
		data,
	} = useSearchInput();

	const isData = data.shipmentSearch ? true : false;

	return (
		<div className={wrapper}>
			{isData ? (
				<TrackingHistory {...data.shipmentSearch} trackYourHistory={trackYourHistory} />
			) : (
				<TrackYourOrder
					isActive={isActive}
					handleFocus={handleFocus}
					orderId={orderId}
					handleOrderId={handleOrderId}
					handleBlur={handleBlur}
					handleSubmit={handleSubmit}
					isError={isError}
					{...trackYourOrder}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
};
