import { Payment } from "../../../../shared/Footer/Payment";

import { Icons } from "@/lib";
import { payments } from "./mock";

import styles from "./rwd.module.scss";
const { wrapper, wrapperPayments, wrapperPaymentsTitle, wrapperSocials } = styles;

export const PaymentsAndSocials = () => {
	return (
		<div className={wrapper}>
			<div className={wrapperPayments}>
				<h3 className={wrapperPaymentsTitle}>Guaranteed Safe Checkout</h3>
				<div>
					{payments.map((payment, idx) => (
						<Payment {...payment} key={payment.image.url + idx} />
					))}
				</div>
			</div>
			<div className={wrapperSocials}>
				<Icons.InstagramSVG />
				<Icons.FacebookSVG />
				<Icons.TiktokSVG />
				<Icons.XSVG />
				<Icons.YouTubeSVG />
			</div>
		</div>
	);
};
