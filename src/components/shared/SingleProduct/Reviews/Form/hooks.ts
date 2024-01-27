import { useCallback, useReducer, useState } from "react";

import { reducer, validateInput, isFormInvalid, isElementInArray, initialState } from "./utils";

import { Actions, type MandatoryInputIds } from "./types";

const submitReviewUrl = "";

export function useReviewsForm(
	reviewFormInformations: Record<string, string>,
	setIsFormActive: (v: boolean) => void,
) {
	const [isLoading, setIsLoading] = useState(false);
	const [comfyValueActive, setComfyValueActive] = useState(6);
	const [productQltyValueActive, setProductQltyValueActive] = useState(6);
	const [sleepQltyValueActive, setSleepQltyValueActive] = useState(6);

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
		setComfyValueActive(6);
		setProductQltyValueActive(6);
		setSleepQltyValueActive(6);
		dispatch({ type: Actions.CLEAR, payload: "" });
	};

	const handleTextAreaBlur = useCallback(
		(e: any) => {
			const currentInput = e.currentTarget;
			const id = formState.mandatoryInputs.review.id;
			const value = currentInput.value;

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
		},
		[formState],
	);
	const handleReviewTitleBlur = useCallback(
		(e: any) => {
			const currentInput = e.currentTarget;
			const id = formState.mandatoryInputs.reviewTitle.id;
			const value = currentInput.value;

			const { hasError, error } = validateInput(id, value);
			dispatch({
				type: Actions.REVIEWTITLE_INPUT_BLUR,
				payload: {
					id,
					value,
					hasError,
					error,
					touched: true,
				},
			});
		},
		[formState],
	);

	const handleStarRatingChange = useCallback(
		(e: any) => {
			const currentInput = e.currentTarget;
			const starRatingValue = currentInput.value;
			const id = formState.mandatoryInputs.starRating.id;
			const starRatingAsNumber = Number(starRatingValue);

			dispatch({
				type: Actions.STAR_RATING_CHANGE,
				payload: {
					id,
					value: starRatingAsNumber,
					hasError: false,
					touched: true,
				},
			});
		},
		[formState],
	);

	const handleFileInputChange = useCallback(
		async (event: any) => {
			const currentInput = event.currentTarget;
			const id = currentInput.id;

			if (currentInput.files && currentInput.files.length > 0) {
				const file = currentInput.files[0];
				const imageNumber = formState.photos.length + 1;
				const image = {
					name: `image_${imageNumber}`,
					preview: URL.createObjectURL(file),
					file,
				};

				const newPhotos = [...formState.photos, image];

				dispatch({
					type: Actions.FILE_INPUT_CHANGE,
					payload: { id: id, value: newPhotos },
				});
			}
		},
		[formState],
	);
	const handleDeletePhoto = useCallback(
		async (preview: string) => {
			const photos = formState.photos.filter((photo) => photo.preview !== preview);

			dispatch({
				type: Actions.FILE_INPUT_CHANGE,
				payload: { id: "photos", value: photos },
			});
		},
		[formState],
	);

	const handleSleepQualityRadioInputChange = useCallback(
		(value: number) => {
			const id = formState.mandatoryInputs.sleepQuality.id;

			dispatch({
				type: Actions.SLEEPQUALITY_INPUT_CHANGE,
				payload: { id, value: String(value), hasError: false, touched: true },
			});
		},
		[formState],
	);
	const handleProductQualityRadioInputChange = useCallback(
		(value: number) => {
			const id = formState.mandatoryInputs.productQuality.id;

			dispatch({
				type: Actions.PRODUCTQUALITY_INPUT_CHANGE,
				payload: { id, value: String(value), hasError: false, touched: true },
			});
		},
		[formState],
	);
	const handleComfyRadioInputChange = useCallback(
		(value: number) => {
			const id = formState.mandatoryInputs.comfy.id;
			dispatch({
				type: Actions.COMFY_INPUT_CHANGE,
				payload: { id, value: String(value), hasError: false, touched: true },
			});
		},
		[formState],
	);
	const handleUntouchedFields = useCallback(() => {
		const mandatoryInputsCopy = { ...formState.mandatoryInputs };
		const mandatoryInputsValues = Object.values(mandatoryInputsCopy);

		const invalidInputs = mandatoryInputsValues.filter(({ touched }) => !touched);

		const isAnyInputInvalid = invalidInputs.length > 0;

		if (isAnyInputInvalid) {
			const textInputIds = ["review", "firstName"];

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

			const mandatoryInputsValues = Object.values(mandatoryInputs);

			const mandatoryInputsData = mandatoryInputsValues.reduce((acc, input) => {
				const inputData = { [input.id]: input.value };
				return Object.assign(acc, inputData);
			}, {});

			const dataToSubmit = {
				...mandatoryInputsData,
				photos: formState.photos,
			} as Record<string, string> & {
				photos: { preview: string; file: any }[];
			};

			const formData = new FormData();
			formData.append("productId", reviewFormInformations.productId);
			formData.append("author", dataToSubmit.firstName);
			formData.append("email", dataToSubmit.email);
			formData.append("location", "");
			formData.append("reviewRating", dataToSubmit.starRating);
			formData.append("reviewTitle", dataToSubmit.reviewTitle);
			formData.append("reviewMessage", dataToSubmit.review);
			formData.append("customFormOption-23851", dataToSubmit.sleepQuality);
			formData.append("customFormOption-23852", dataToSubmit.productQuality);
			formData.append("customFormOption-23853", dataToSubmit.comfy);
			formData.append("productName", reviewFormInformations.productName);
			formData.append("productSKU", reviewFormInformations.productSKU);
			formData.append("productType", reviewFormInformations.productType);
			formData.append("productDescription", reviewFormInformations.description);
			formData.append("productImageUrl", reviewFormInformations.productImageUrl);
			formData.append("productUrl", reviewFormInformations.productUrl);
			formData.append("reviewSource", "widget");

			//TO FIX - when we comment 2 lines below the request is sent correctly
			//add map
			if (dataToSubmit?.photos?.[0]?.file) {
				formData.append("image0", dataToSubmit.photos[0].file, dataToSubmit.photos[0].file.name);
			}
			// formData.append('video0', dataToSubmit.photos[0].file, 'file');

			try {
				setIsLoading(true);
				const response = await fetch(submitReviewUrl, {
					method: "POST",
					body: formData,
				});
				const result = await response.json();
				console.log(result);
			} catch (err) {
				console.error(err);
			}
			setIsLoading(false);
			setIsFormActive(false);
			handleClearForm();
			dispatch({ type: Actions.SUBMIT, payload: { submitted: true } });
		},
		[
			formState.mandatoryInputs,
			formState.photos,
			handleUntouchedFields,
			reviewFormInformations.description,
			reviewFormInformations.productId,
			reviewFormInformations.productImageUrl,
			reviewFormInformations.productName,
			reviewFormInformations.productSKU,
			reviewFormInformations.productType,
			reviewFormInformations.productUrl,
			setIsFormActive,
		],
	);

	return {
		formState,
		handleInputBlur,
		handleFileInputChange,
		handleStarRatingChange,
		handleTextAreaBlur,
		isLoading,
		handleSleepQualityRadioInputChange,
		handleProductQualityRadioInputChange,
		handleComfyRadioInputChange,
		handleReviewTitleBlur,
		handleSubmit,
		handleClearForm,
		comfyValueActive,
		setComfyValueActive,
		productQltyValueActive,
		setProductQltyValueActive,
		sleepQltyValueActive,
		setSleepQltyValueActive,
		handleDeletePhoto,
	};
}
