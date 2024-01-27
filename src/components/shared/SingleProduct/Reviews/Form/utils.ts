import type { Reducer, Action, InitialFormState, MandatoryInputs } from "./types";

export const initialState: InitialFormState = {
	mandatoryInputs: {
		firstName: {
			id: "firstName",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
		reviewTitle: {
			id: "reviewTitle",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
		email: {
			id: "email",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
		review: {
			id: "review",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
		starRating: {
			id: "starRating",
			value: 0,
			hasError: false,
			touched: false,
			error: "This filed is required",
		},
		sleepQuality: {
			id: "sleepQuality",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
		productQuality: {
			id: "productQuality",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
		comfy: {
			id: "comfy",
			value: "",
			touched: false,
			hasError: false,
			error: "This filed is required",
		},
	},
	photos: [],
	submitted: false,
};
export const reducer: Reducer<InitialFormState, Action> = (state, { type, payload }) => {
	switch (type) {
		case "TEXT_INPUT_BLUR":
		case "REVIEWTITLE_INPUT_BLUR":
		case "STAR_RATING_CHANGE":
		case "SLEEPQUALITY_INPUT_CHANGE":
			return {
				...state,
				mandatoryInputs: { ...state.mandatoryInputs, [payload.id]: payload },
			};
		case "PRODUCTQUALITY_INPUT_CHANGE":
			return {
				...state,
				mandatoryInputs: { ...state.mandatoryInputs, [payload.id]: payload },
			};
		case "COMFY_INPUT_CHANGE":
			return {
				...state,
				mandatoryInputs: { ...state.mandatoryInputs, [payload.id]: payload },
			};
		case "FILE_INPUT_CHANGE":
			return {
				...state,
				[payload.id]: payload.value,
			};

		case "RADIO_BUTTON_ERROR":
			return {
				...state,
				mandatoryInputs: {
					...state.mandatoryInputs,
					[payload.id]: {
						...state.mandatoryInputs[payload.id],
						hasError: payload.hasError,
					},
				},
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
		case "firstName":
			if (isEmpty) {
				hasError = true;
				error = "This filed is required";
			} else if (!/^[a-zA-Z ]+$/.test(value)) {
				hasError = true;
				error = "Invalid name. Please avoid special characters";
			} else {
				hasError = false;
				error = "";
			}
			break;
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
		case "review":
			if (isEmpty) {
				hasError = true;
				error = "This filed is required";
			}
			break;
		case "reviewTitle":
			if (isEmpty) {
				hasError = true;
				error = "This filed is required";
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
