import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperEntry, wrapperEntryText, wrapperEntryIcon } = styles;

export const Guarantees = () => {
	return (
		<div className={wrapper}>
			<div className={wrapperEntry}>
				<div className={wrapperEntryIcon}>
					<Icons.FreeShippingSVG />
				</div>
				<div className={wrapperEntryText}>
					<p>Free shipping above $50</p>
				</div>
			</div>
			<div className={wrapperEntry}>
				<div className={wrapperEntryIcon}>
					<Icons.FreeReturnsSVG />
				</div>
				<div className={wrapperEntryText}>
					<p>free returns</p>
				</div>
			</div>
			<div className={wrapperEntry}>
				<div className={wrapperEntryIcon}>
					<Icons.SupportSVG />
				</div>
				<div className={wrapperEntryText}>
					<p>support 24/7</p>
				</div>
			</div>
			<div className={wrapperEntry}>
				<div className={wrapperEntryIcon}>
					<Icons.SecuredPaymentsSVG />
				</div>
				<div className={wrapperEntryText}>
					<p>secured payments</p>
				</div>
			</div>
		</div>
	);
};
