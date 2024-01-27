import { useCallback, useReducer, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { type AddressPropss } from "../../types";

import { reducer, validateInput, isFormInvalid, isElementInArray } from "./utils";
import {
	createCustomerAddress,
	updateCustomerAddress,
} from "@/lib/shopify/functions/account/actions";

import { Actions, type InitialFormState, type MandatoryInputIds } from "./types";

export function useShippingAddressForm(
	setShowAddressForm: (value: boolean) => void,
	editFormContent?: AddressPropss,
) {
	const initialState: InitialFormState = {
		mandatoryInputs: {
			country: {
				id: "country",
				value: editFormContent ? editFormContent.country : "",
				touched: editFormContent && editFormContent.country ? true : false,
				hasError: false,
				error: "",
			},
			name: {
				id: "name",
				value: editFormContent ? `${editFormContent.firstName} ${editFormContent.lastName}` : "",
				touched: editFormContent && editFormContent.firstName ? true : false,
				hasError: false,
				error: "",
			},
			street: {
				id: "street",
				value: editFormContent ? editFormContent.address1 : "",
				touched: editFormContent && editFormContent.address1 ? true : false,
				hasError: false,
				error: "",
			},
			apartment: {
				id: "apartment",
				value: editFormContent ? editFormContent.address2 : "",
				touched: editFormContent && editFormContent.address2 ? true : false,
				hasError: false,
				error: "",
			},
			city: {
				id: "city",
				value: editFormContent ? editFormContent.city : "",
				touched: editFormContent && editFormContent.city ? true : false,
				hasError: false,
				error: "",
			},
			state: {
				id: "state",
				value: editFormContent ? editFormContent.province : "",
				touched: editFormContent && editFormContent.province ? true : false,
				hasError: false,
				error: "",
			},
			zipCode: {
				id: "zipCode",
				value: editFormContent ? editFormContent.zip : "",
				touched: editFormContent && editFormContent.zip ? true : false,
				hasError: false,
				error: "",
			},
			phone: {
				id: "phone",
				value: editFormContent ? editFormContent.phone ?? "" : "",
				touched: editFormContent && editFormContent.phone ? true : false,
				hasError: false,
				error: "",
			},
		},
		submitted: false,
	};

	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const [error, setError] = useState([""]);

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

	const handleCountry = useCallback((value: string, id: MandatoryInputIds) => {
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

	const handleUntouchedFields = useCallback(() => {
		const mandatoryInputsCopy = { ...formState.mandatoryInputs };
		const mandatoryInputsValues = Object.values(mandatoryInputsCopy);

		const invalidInputs = mandatoryInputsValues.filter(({ touched }) => !touched);

		const isAnyInputInvalid = invalidInputs.length > 0;

		if (isAnyInputInvalid) {
			const textInputIds = ["name", "street", "country", "state", "city", "zipCode"];

			for (const { id, touched } of invalidInputs) {
				const isTextInput = isElementInArray(id, textInputIds);
				const isTextInputEmpty = !touched;
				const error = "This filed is required";

				if (isTextInput && isTextInputEmpty) {
					dispatch({
						type: Actions.TEXT_INPUT_ERROR,
						payload: { error, hasError: true, id },
					});
				} else {
					dispatch({
						type: Actions.RADIO_BUTTON_ERROR,
						payload: { id, hasError: true },
					});
				}
			}
			return;
		}
		return;
	}, [formState.mandatoryInputs]);

	const handleSubmit = useCallback(
		async (event: any) => {
			event.preventDefault();

			const mandatoryInputs = { ...formState.mandatoryInputs };

			const isInvalid = isFormInvalid(mandatoryInputs);

			if (isInvalid) {
				handleUntouchedFields();
				return;
			}

			const mandatoryInputsValues = Object.values(mandatoryInputs);

			const mandatoryInputsData = mandatoryInputsValues.reduce((acc, input) => {
				const inputData = { [input.id]: input.value };
				return Object.assign(acc, inputData);
			}, {});

			const dataToSubmit: any = {
				...mandatoryInputsData,
			};

			const data = {
				address1: dataToSubmit.street,
				address2: dataToSubmit.apartment,
				city: dataToSubmit.city,
				country: dataToSubmit.country,
				firstName: dataToSubmit.name.split(" ")[0],
				lastName: dataToSubmit.name.split(" ")[1],
				phone: dataToSubmit.phone,
				province: dataToSubmit.state,
				zip: dataToSubmit.zipCode,
			};

			startTransition(async () => {
				if (editFormContent) {
					updateCustomerAddress(editFormContent.id, data);
				} else {
					await createCustomerAddress(data);
				}
				setShowAddressForm(false);
				handleClearForm();

				router.refresh();
			});
			setError([""]);
		},
		[editFormContent, formState.mandatoryInputs, handleUntouchedFields, router, setShowAddressForm],
	);

	return {
		error,
		formState,
		isPending,
		handleInputBlur,
		handleSubmit,
		handleCountry,
	};
}
