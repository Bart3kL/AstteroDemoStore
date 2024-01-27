import { useState, useEffect, useRef } from "react";
// import { useOnClickOutside } from 'usehooks-ts';

import { Tab } from "./Tab";

import { cx } from "@/lib/utils";
import { type SelectorsProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent, wrapperContentShowMore } = styles;

export const Selectors = ({
	currentTrackingCode,
	setCurrentTrackingCode,
	sortedShipments,
}: SelectorsProps) => {
	const orderSelectorRef = useRef(null);
	const [showMore, setShowMore] = useState(false);
	const [chosenTrackingCode, setChosenTrackingCode] = useState(currentTrackingCode);

	useEffect(() => {
		setCurrentTrackingCode(chosenTrackingCode ?? "");
	}, [chosenTrackingCode, setCurrentTrackingCode, showMore]);

	// useOnClickOutside(orderSelectorRef, () => setShowMore(false));

	return (
		<div className={wrapper}>
			<div
				ref={orderSelectorRef}
				className={cx(wrapperContent, showMore && wrapperContentShowMore)}
			>
				{!showMore && (
					<Tab
						{...sortedShipments.filter(
							(shipment) => shipment.trackingCode === currentTrackingCode,
						)[0]}
						setShowMore={setShowMore}
						showMore={showMore}
						isFirst
						isOnlyOneOrder={sortedShipments.length === 1}
						chosenTrackingCode={chosenTrackingCode}
						setChosenTrackingCode={setChosenTrackingCode}
					/>
				)}
				{showMore && (
					<>
						{sortedShipments.map((shipment, idx) => (
							<Tab
								{...shipment}
								showMore={showMore}
								chosenTrackingCode={chosenTrackingCode}
								setChosenTrackingCode={setChosenTrackingCode}
								isFirst={idx === 0}
								setShowMore={setShowMore}
								key={shipment.trackingCode + idx}
							/>
						))}
					</>
				)}
			</div>
		</div>
	);
};
