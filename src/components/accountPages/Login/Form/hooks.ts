import { useCallback, useReducer, useState } from "react";
import { useRouter } from "next/navigation";

import { reducer, validateInput, isFormInvalid, isElementInArray, initialState } from "./utils";
import { login } from "@/lib/shopify/functions/account/actions";

import { Actions, type MandatoryInputIds } from "./types";

export function useForm() {
	const router = useRouter();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [formState, dispatch] = useReducer(reducer, initialState);
	const handleInputBlur = useCallback((e: any) => {
		const currentInput = e.currentTarget;
		const value = currentInput.value;

		const id = currentInput.id as MandatoryInputIds;
		const { hasError, error } = e._reactName === "onBlur" && (validateInput(id, value) as any);

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
			const textInputIds = ["password", "email"];

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
				try {
					const { data, status } = await login(
						mandatoryInputs.email.value,
						mandatoryInputs.password.value,
					);

					if (status === 200) {
						if (data.data.customerAccessTokenCreate.customerAccessToken.accessToken) {
							setError("");
							router.push("/account");
							setIsLoading(false);
							handleClearForm();
							dispatch({ type: Actions.SUBMIT, payload: { submitted: true } });
						}
					}
				} catch (error) {
					setError("Invalid password or email");
					setIsLoading(false);
					console.error("An error occurred (postNotifyWhenProductIsAvailable):", error);
					throw error;
				}
			} catch (err) {
				console.error(err);
			}
		},
		[formState.mandatoryInputs, handleUntouchedFields, router],
	);

	return {
		formState,
		handleInputBlur,
		isLoading,
		handleSubmit,
		error,
	};
}
