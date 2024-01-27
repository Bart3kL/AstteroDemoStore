export interface SearchInputProps {
	isActive: boolean;
	handleFocus: () => void;
	orderId: string;
	handleOrderId: (e: any) => void;
	errorLabel: string;
	inputPlaceholder: string;
	handleBlur: () => void;
	isError: boolean;
}
