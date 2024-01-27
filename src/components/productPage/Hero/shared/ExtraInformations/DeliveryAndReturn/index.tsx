import type { DeliveryAndReturnProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperDescription, wrapperBtn } = styles;

export const DeliveryAndReturn = ({ handleToggle }: DeliveryAndReturnProps) => {
	return (
		<div className={wrapper}>
			<h3 className={wrapperTitle}>Delivery and Return</h3>
			<div className={wrapperDescription}>
				<h5>Our parcel courier service</h5>
				<p>
					Lumia is proud to offer an exceptional international parcel shipping service. It is
					straightforward and very easy to organise international parcel shipping. Our customer
					service team works around the clock to make sure that you receive high quality courier
					service from start to finish.
				</p>
				<h5>Shipping Time</h5>
				<p>
					<span>
						The shipping time is based on the shipping method you chose and your location.
					</span>
					<br />
					<b>FedEx </b>takes about 1-5 working days for delivery.
					<br />
					<b>DHL </b>takes about 2-5 working days for delivery.
					<br />
					<b>DHL International </b>takes about 4-14 working days for delivery.
					<br />
				</p>
			</div>
			<div className={wrapperBtn}>
				<button onClick={handleToggle}>Close</button>
			</div>
		</div>
	);
};
