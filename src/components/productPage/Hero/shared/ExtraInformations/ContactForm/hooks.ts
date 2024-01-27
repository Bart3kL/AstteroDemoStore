import { useCallback, useReducer, useState } from "react";

import { reducer, validateInput, isFormInvalid, isElementInArray, initialState } from "./utils";

import { Actions, type MandatoryInputIds } from "./types";

export function useForm(handleToggle: () => void) {
	const [isLoading, setIsLoading] = useState(false);
	const [formState, dispatch] = useReducer(reducer, initialState);
	const handleInputBlur = useCallback((e: any) => {
		const currentInput = e.currentTarget;
		const value = currentInput.value;

		const id = currentInput.id as MandatoryInputIds;
		const { hasError, error } = validateInput(id, value);

		dispatch({
			type: Actions.TEXT_INPUT_BLUR,
			payload: {
				id,
				value,
				hasError,
				error,
				touched: true,
			},
		});
	}, []);

	const handleClearForm = () => {
		dispatch({ type: Actions.CLEAR, payload: "" });
	};

	const handleUntouchedFields = useCallback(() => {
		const mandatoryInputsCopy = { ...formState.mandatoryInputs };
		const mandatoryInputsValues = Object.values(mandatoryInputsCopy);

		const invalidInputs = mandatoryInputsValues.filter(({ touched }) => !touched);

		const isAnyInputInvalid = invalidInputs.length > 0;

		if (isAnyInputInvalid) {
			const textInputIds = ["message", "firstName", "email"];

			for (const { id, touched } of invalidInputs) {
				const isTextInput = isElementInArray(id, textInputIds);
				const isTextInputEmpty = !touched;
				const error = "This filed is required";

				if (isTextInput && isTextInputEmpty) {
					dispatch({
						type: Actions.TEXT_INPUT_ERROR,
						payload: { error, hasError: true, id },
					});
				}
			}
			return;
		}
		return;
	}, [formState]);

	const handleSubmit = useCallback(
		async (event: any) => {
			event.preventDefault();
			const mandatoryInputs = { ...formState.mandatoryInputs };

			const isInvalid = isFormInvalid(mandatoryInputs);
			if (isInvalid) {
				handleUntouchedFields();
				return;
			}

			try {
				setIsLoading(true);
			} catch (err) {
				console.error(err);
			}
			setTimeout(() => {
				setIsLoading(false);
				handleClearForm();
				dispatch({ type: Actions.SUBMIT, payload: { submitted: true } });
				handleToggle();
			}, 500);
		},
		[formState.mandatoryInputs, handleUntouchedFields, handleToggle],
	);

	return {
		formState,
		handleInputBlur,
		isLoading,
		handleSubmit,
		handleClearForm,
	};
}
