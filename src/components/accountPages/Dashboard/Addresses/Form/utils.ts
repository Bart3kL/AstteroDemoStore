import { type Reducer, type Action, type InitialFormState, type MandatoryInputs } from "./types";

const initialState: InitialFormState = {
	mandatoryInputs: {
		country: {
			id: "country",
			value: "",
			touched: false,
			hasError: false,
			error: "",
		},
		name: {
			id: "name",
			value: "",
			touched: false,
			hasError: false,
			error: "",
		},
		street: {
			id: "street",
			value: "",
			touched: false,
			hasError: false,
			error: "",
		},
		apartment: {
			id: "apartment",
			value: "",
			touched: false,
			hasError: false,
			error: "",
		},
		city: {
			id: "city",
			value: "",
			touched: false,
			hasError: false,
			error: "",
		},
		state: {
			id: "state",
			value: "",
			touched: false,
			hasError: false,
			error: "",
		},
		zipCode: {
			id: "zipCode",
			value: "",
			touched: false,
			hasError: false,
			error: "",
		},
		phone: {
			id: "phone",
			value: "",
			touched: false,
			hasError: false,
			error: "",
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
		case "name":
			if (isEmpty) {
				hasError = true;
				error = "This filed is required";
			} else if (!/^([\w]{3,})+\s+([\w\s]{3,})+$/i.test(value)) {
				hasError = true;
				error = "Invalid name or surname";
			} else {
				hasError = false;
				error = "";
			}
			break;
		case "country":
		case "state":
		case "city":
		case "street":
			if (isEmpty) {
				hasError = true;
				error = "This filed is required";
			}
			break;
		case "zipCode":
			if (isEmpty) {
				hasError = true;
				error = "This filed is required";
			} else if (!/^[0-9]+$/.test(value)) {
				hasError = true;
				error = "Invalid zip code";
			} else {
				hasError = false;
				error = "";
			}
			break;
		case "apartment":
		case "phone":
			return {
				hasError: false,
				error: "",
			};

		default:
			console.error("Unknown type of input.");
	}
	return { hasError, error };
};

export const isFormInvalid = (inputs: MandatoryInputs) => {
	const mandatoryInputValues = Object.values(inputs).filter(
		(x) => x.id !== "apartment" && x.id !== "phone",
	);
	const isAnyInputInvalid = mandatoryInputValues.some(
		({ hasError, touched }) => hasError || !touched,
	);
	return isAnyInputInvalid;
};

export const isElementInArray = (id: string, array: string[]) => array.indexOf(id) > -1;
