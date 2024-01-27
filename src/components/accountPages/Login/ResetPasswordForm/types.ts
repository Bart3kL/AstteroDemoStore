export interface ResetPasswordFormProps {
	isCurrentForm: boolean;
	handleToggle: () => void;
}

export type Reducer<S, A> = (prevState: S, action: A) => S;

export type MandatoryInputIds = "email";

interface InputState<T> {
	value: T;
	touched: boolean;
	hasError: boolean;
	error: string;
	id: MandatoryInputIds;
}

interface TextInputState extends InputState<string> {}

export interface MandatoryInputs {
	email: TextInputState;
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
	TEXT_INPUT_BLUR = "TEXT_INPUT_BLUR",
	TEXT_INPUT_ERROR = "TEXT_INPUT_ERROR",
	SUBMIT = "SUBMIT",
	CLEAR = "CLEAR",
}

export type Action =
	| { type: Actions.CLEAR; payload: string }
	| { type: Actions.TEXT_INPUT_BLUR; payload: TextInputChangePayload }
	| { type: Actions.SUBMIT; payload: { submitted: true } }
	| {
			type: Actions.TEXT_INPUT_ERROR;
			payload: TextInputErrorPayload;
	  };
