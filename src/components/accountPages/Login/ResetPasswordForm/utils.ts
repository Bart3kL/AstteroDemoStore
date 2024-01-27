import type { Reducer, Action, InitialFormState, MandatoryInputs } from "./types";

export const initialState: InitialFormState = {
	mandatoryInputs: {
		email: {
			id: "email",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
	},
	submitted: false,
};
export const reducer: Reducer<InitialFormState, Action> = (state, { type, payload }) => {
	switch (type) {
		case "TEXT_INPUT_BLUR":
			return {
				...state,
				mandatoryInputs: { ...state.mandatoryInputs, [payload.id]: payload },
			};
		case "TEXT_INPUT_ERROR":
			return {
				...state,
				mandatoryInputs: {
					...state.mandatoryInputs,
					[payload.id]: {
						...state.mandatoryInputs[payload.id],
						hasError: payload.hasError,
						error: payload.error,
					},
				},
			};
		case "SUBMIT":
			return {
				...state,
				submitted: payload.submitted,
			};
		case "CLEAR":
			return initialState;

		default:
			return state;
	}
};

export const isEmailValid = (email: string) => {
	const emailRegExp = new RegExp(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	);

	return emailRegExp.test(email);
};

export const validateInput = (id: string, value: string) => {
	const isEmpty = value.trim().length === 0;
	let hasError = false,
		error = "";

	switch (id) {
		case "email":
			if (isEmpty) {
				hasError = true;
				error = "This filed is required";
			} else if (!isEmailValid(value)) {
				hasError = true;
				error = "Invalid email";
			} else {
				hasError = false;
				error = "";
			}
			break;
		default:
			console.error("Unknown type of input.");
	}
	return { hasError, error };
};

export const isFormInvalid = (inputs: MandatoryInputs) => {
	const mandatoryInputValues = Object.values(inputs);
	const isAnyInputInvalid = mandatoryInputValues.some(
		({ hasError, touched }) => hasError || !touched,
	);
	return isAnyInputInvalid;
};

export const isElementInArray = (id: string, array: string[]) => array.indexOf(id) > -1;
