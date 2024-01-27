export interface OptionsProps {
	selectedOption: string;
	id: string;
	hasError: boolean;
	error: string;
	countries: {
		name: string;
		isoCode: string;
	}[];
	countryLabel: string;
	handleChange: (value: string, id: any) => void;
}
