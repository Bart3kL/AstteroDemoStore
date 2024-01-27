export interface CurtainProps {
	show: boolean;
	curtainClose?: boolean;
	onClose: () => void;
	curtainColor?: "white" | "black";
}
