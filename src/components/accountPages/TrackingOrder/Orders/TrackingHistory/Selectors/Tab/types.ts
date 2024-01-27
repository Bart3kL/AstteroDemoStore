import { type ShipmentProps } from "../../types";

export type TabProps = ShipmentProps & {
	setChosenTrackingCode: (value: string) => void;
	chosenTrackingCode: string;
	setShowMore: (value: boolean) => void;
	showMore: boolean;
	isFirst: boolean;
	isOnlyOneOrder?: boolean;
};
