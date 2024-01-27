import type { ReviewsProps } from "../types";
export type Reducer<S, A> = (prevState: S, action: A) => S;

export type MandatoryInputIds =
	| "starRating"
	| "reviewTitle"
	| "sleepQuality"
	| "productQuality"
	| "comfy"
	| "review"
	| "firstName"
	| "email";

interface InputState<T> {
	value: T;
	touched: boolean;
	hasError: boolean;
	error: string;
	id: MandatoryInputIds;
}

interface TextInputState extends InputState<string> {}

interface StarRatingState extends InputState<number> {}

interface RadioInputState extends InputState<string> {}

export interface MandatoryInputs {
	firstName: TextInputState;
	reviewTitle: TextInputState;
	email: TextInputState;
	review: TextInputState;
	starRating: StarRatingState;
	sleepQuality: RadioInputState;
	productQuality: RadioInputState;
	comfy: RadioInputState;
}

export interface InitialFormState {
	mandatoryInputs: MandatoryInputs;
	photos: { preview: string; file: File }[];
	submitted: boolean;
}

interface BasicPayload<T> {
	value: T;
	id: MandatoryInputIds;
	hasError: boolean;
	touched: boolean;
}

type FileInputChangePayload = {
	value: any;
	id: string;
};

interface StarRatingChangePayload extends BasicPayload<number> {}

interface OptionInputChangePayload extends BasicPayload<string> {}

interface TextInputChangePayload extends BasicPayload<string> {
	error: string;
}

interface TextInputErrorPayload extends Omit<TextInputChangePayload, "value" | "touched"> {}

export enum Actions {
	STAR_RATING_CHANGE = "STAR_RATING_CHANGE",
	TEXT_INPUT_BLUR = "TEXT_INPUT_BLUR",
	REVIEWTITLE_INPUT_BLUR = "REVIEWTITLE_INPUT_BLUR",
	FILE_INPUT_CHANGE = "FILE_INPUT_CHANGE",
	SLEEPQUALITY_INPUT_CHANGE = "SLEEPQUALITY_INPUT_CHANGE",
	PRODUCTQUALITY_INPUT_CHANGE = "PRODUCTQUALITY_INPUT_CHANGE",
	COMFY_INPUT_CHANGE = "COMFY_INPUT_CHANGE",
	RADIO_BUTTON_ERROR = "RADIO_BUTTON_ERROR",
	TEXT_INPUT_ERROR = "TEXT_INPUT_ERROR",
	SUBMIT = "SUBMIT",
	CLEAR = "CLEAR",
}

export type Action =
	| { type: Actions.STAR_RATING_CHANGE; payload: StarRatingChangePayload }
	| { type: Actions.CLEAR; payload: string }
	| { type: Actions.TEXT_INPUT_BLUR; payload: TextInputChangePayload }
	| { type: Actions.REVIEWTITLE_INPUT_BLUR; payload: TextInputChangePayload }
	| { type: Actions.FILE_INPUT_CHANGE; payload: FileInputChangePayload }
	| {
			type: Actions.SLEEPQUALITY_INPUT_CHANGE;
			payload: OptionInputChangePayload;
	  }
	| {
			type: Actions.PRODUCTQUALITY_INPUT_CHANGE;
			payload: OptionInputChangePayload;
	  }
	| { type: Actions.COMFY_INPUT_CHANGE; payload: OptionInputChangePayload }
	| { type: Actions.SUBMIT; payload: { submitted: true } }
	| {
			type: Actions.RADIO_BUTTON_ERROR;
			payload: { id: MandatoryInputIds; hasError: boolean };
	  }
	| {
			type: Actions.TEXT_INPUT_ERROR;
			payload: TextInputErrorPayload;
	  };

export type FormProps = {
	reviewFormInformation: {
		productId: string;
		productName: string;
		productSKU: string;
		productType: string;
		description: string;
		variantName: string;
		productUrl: string;
		productImageUrl: string;
	};
} & ReviewsProps["reviews"]["form"] & {
		clearLabel: string;
		reviewsLabel: string;
		handleForm: () => void;
		setIsFormActive: (v: boolean) => void;
		isFormActive: boolean;
	};
