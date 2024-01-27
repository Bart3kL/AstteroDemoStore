import { type CurrentStatusProps } from "./types";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperSingle, wrapperLine, wrapperLineActive } = styles;

export const CurrentStatus = ({ status, pending, shipped, delivered }: CurrentStatusProps) => {
	const currentStatus = {
		status,
		isFinished: status === "PRE_TRANSIT" ? false : true,
	};

	return (
		<div className={wrapper}>
			<div className={wrapperSingle}>
				<Icons.PendingIcon />
				<p className="no-translate">{pending}</p>
			</div>
			<div className={wrapperSingle}>
				{currentStatus.status === "TRANSIT" || currentStatus.status === "DELIVERED" ? (
					<Icons.ShippedDoneIcon />
				) : (
					<Icons.ShippedUndoneIcon />
				)}
				<p className="no-translate">{shipped}</p>
			</div>
			<div className={wrapperSingle}>
				{currentStatus.status === "DELIVERED" ? (
					<Icons.DeliveredDoneIcon />
				) : (
					<Icons.DeliveredUndoneIcon />
				)}
				<p className="no-translate">{delivered}</p>
			</div>
			<div className={wrapperLine}></div>
			<div
				className={wrapperLineActive}
				style={{
					width:
						currentStatus.status === "PRE_TRANSIT"
							? "17.75%"
							: currentStatus.status === "TRANSIT" && currentStatus.isFinished
							? "53.25%"
							: "75%",
				}}
			>
				{currentStatus.isFinished && <p />}
			</div>
		</div>
	);
};
