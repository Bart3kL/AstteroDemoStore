export interface OptionProps {
	name: string;
	idx: number;
	hasError: boolean;
	onChange: (e: number) => void;
	active: number;
	setActive: (v: number) => void;
}
