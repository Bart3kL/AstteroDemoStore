import { Curtain } from "../../../../shared/Modal/Curtain";
import { Portal } from "../../../../shared/Modal/Portal";

import type { ModalProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive, wrapperExit, wrapperContent } = styles;

export const Modal = ({ isActive, handleToggle, children }: ModalProps) => {
	return (
		<Portal>
			<div>
				<Curtain
					show={isActive}
					onClose={handleToggle}
					curtainClose={true}
					curtainColor={"black"}
				/>
				<div className={cx(wrapper, isActive && wrapperActive)}>
					<div className={wrapperExit}>
						<button onClick={handleToggle} aria-label="Close">
							<Icons.CloseSVG />
						</button>
					</div>
					<div className={wrapperContent}>{children}</div>
				</div>
			</div>
		</Portal>
	);
};
