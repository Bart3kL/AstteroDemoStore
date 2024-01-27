import { type AddressPropss } from "../../types";

export type Reducer<S, A> = (prevState: S, action: A) => S;

export type MandatoryInputIds =
	| "name"
	| "street"
	| "apartment"
	| "phone"
	| "country"
	| "city"
	| "state"
	| "zipCode";

interface InputState<T> {
	value: T;
	touched: boolean;
	hasError: boolean;
	error: string;
	id: MandatoryInputIds;
}

interface TextInputState extends InputState<string> {}

export interface MandatoryInputs {
	name: TextInputState;
	street: TextInputState;
	apartment: TextInputState;
	country: TextInputState;
	city: TextInputState;
	state: TextInputState;
	zipCode: TextInputState;
	phone: TextInputState;
}

export interface InitialFormState {
	mandatoryInputs: MandatoryInputs;
	submitted: boolean;
}

interface BasicPayload<T> {
	value: T;
	id: MandatoryInputIds;
	hasError: boolean;
	touched: boolean;
}

interface TextInputChangePayload extends BasicPayload<string> {
	error: string;
}

interface TextInputErrorPayload extends Omit<TextInputChangePayload, "value" | "touched"> {}

export enum Actions {
	TEXT_INPUT_ERROR = "TEXT_INPUT_ERROR",
	TEXT_INPUT_BLUR = "TEXT_INPUT_BLUR",

	RADIO_BUTTON_ERROR = "RADIO_BUTTON_ERROR",
	SUBMIT = "SUBMIT",
	CLEAR = "CLEAR",
}

export type Action =
	| { type: Actions.CLEAR; payload: string }
	| { type: Actions.TEXT_INPUT_BLUR; payload: TextInputChangePayload }
	| {
			type: Actions.TEXT_INPUT_ERROR;
			payload: TextInputErrorPayload;
	  }
	| { type: Actions.SUBMIT; payload: { submitted: true } }
	| {
			type: Actions.RADIO_BUTTON_ERROR;
			payload: { id: MandatoryInputIds; hasError: boolean };
	  };

export type DataToSubmitProps = {
	apartment: string;
	city: string;
	country: string;
	name: string;
	phone: string;
	state: string;
	street: string;
	zipCode: string;
};

export interface FormProps {
	showAddressForm: boolean;
	setShowAddressForm: (showAddressForm: boolean) => void;
	title: string;
	editFormContent?: AddressPropss;
}
