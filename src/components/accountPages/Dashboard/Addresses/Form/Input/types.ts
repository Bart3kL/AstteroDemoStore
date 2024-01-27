export interface InputProps {
	value: string;
	hasError: boolean;
	error: string;
	id: string;
	type: string;
	handleInputBlur: (e: any) => void;
	label: string;
	placeholder: string;
	optional?: boolean;
}
