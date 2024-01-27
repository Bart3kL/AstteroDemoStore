import type { AnimationConsentProps } from "./types";
import { cx } from "@/lib/utils";
import { useManageAnimation } from "./hooks";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive, wrapperClose } = styles;

export const AnimationConsent = ({
	showAnimationConsent,
	setShowAnimationConsent,
}: AnimationConsentProps) => {
	const { allowAnimation, disallowAnimation } = useManageAnimation();

	const handleClosePopup = () => {
		setShowAnimationConsent(false);
	};

	return (
		<div className={cx(wrapper, showAnimationConsent && wrapperActive)}>
			<div className={wrapperClose} onClick={handleClosePopup}>
				<Icons.CloseSVG />
			</div>
			<p>consent for wishlist animation</p>
			<div>
				<button
					onClick={() => {
						handleClosePopup();
						allowAnimation();
					}}
				>
					show always
				</button>
				<button
					onClick={() => {
						handleClosePopup(), disallowAnimation();
					}}
				>{`Don't show`}</button>
			</div>
		</div>
	);
};
