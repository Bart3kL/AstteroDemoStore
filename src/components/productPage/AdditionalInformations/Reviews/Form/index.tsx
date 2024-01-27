import { Option } from "./Option";
import { StarRating } from "./StarRating";
import { PhotosInput } from "./PhotosInput";

import type { FormProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { useReviewsForm } from "./hooks";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperLine,
	wrapperHeader,
	wrapperForm,
	wrapperFormContainer,
	wrapperFormContainerMessage,
	wrapperFormContainerError,
	wrapperFormContainerCheckboxes,
	wrapperFormContainerCheckboxesOptions,
	wrapperFormContainerLabel,
	wrapperFormContainerInput,
	wrapperFormContainerInputError,
	wrapperFormContainerInputText,
	wrapperFormContainerInputTextarea,
	wrapperFormWrapper,
	wrapperFormWrapperButtons,
	wrapperFormWrapperButtonsBtn,
	wrapperFormWrapperButtonsClear,
	wrapperFormWrapperButtonsSubmit,
	wrapperBox,
} = styles;

export const Form = ({
	reviewFormInformation,
	isFormActive,
	handleForm,
	buttonLabel,
	email,
	firstName,
	rating,
	review,
	sleepQuality,
	productQuality,
	comfy,
	reviewTitle,
	setIsFormActive,
	reviewsLabel,
	clearLabel,
}: FormProps) => {
	const {
		formState,
		handleFileInputChange,
		handleInputBlur,
		handleStarRatingChange,
		handleTextAreaBlur,
		handleReviewTitleBlur,
		handleSleepQualityRadioInputChange,
		handleProductQualityRadioInputChange,
		handleComfyRadioInputChange,
		handleSubmit,
		isLoading,
		handleClearForm,
		comfyValueActive,
		setComfyValueActive,
		productQltyValueActive,
		setProductQltyValueActive,
		sleepQltyValueActive,
		setSleepQltyValueActive,
		handleDeletePhoto,
	} = useReviewsForm(reviewFormInformation, setIsFormActive);

	const { mandatoryInputs } = formState;

	return (
		<div className={cx(wrapper, isFormActive && wrapperActive)}>
			<div className={wrapperLine} />
			<div className={wrapperHeader}>
				<h4>{reviewsLabel}</h4>
				<div onClick={handleForm}>
					<Icons.ArrowLeftSVG />
				</div>
			</div>
			<div className={wrapperBox}>
				<form onSubmit={handleSubmit} className={wrapperForm}>
					<div>
						<div className={wrapperFormContainer}>
							<label htmlFor="firstName" className={wrapperFormContainerLabel}>
								{firstName.label}
							</label>
							<input
								type="text"
								id="firstName"
								value={mandatoryInputs.firstName.value}
								className={cx(
									wrapperFormContainerInput,
									wrapperFormContainerInputText,
									mandatoryInputs.firstName.hasError && wrapperFormContainerInputError,
								)}
								onChange={handleInputBlur}
								onBlur={handleInputBlur}
							/>
							{mandatoryInputs.firstName.hasError && (
								<p className={wrapperFormContainerMessage}>
									<Icons.WarningSVG /> {mandatoryInputs.firstName.error}
								</p>
							)}
						</div>
						<div className={wrapperFormContainer}>
							<label htmlFor="email" className={wrapperFormContainerLabel}>
								{email.label}
							</label>
							<input
								type="email"
								id="email"
								value={mandatoryInputs.email.value}
								className={cx(
									wrapperFormContainerInput,
									wrapperFormContainerInputText,
									mandatoryInputs.email.hasError && wrapperFormContainerInputError,
								)}
								onChange={handleInputBlur}
								onBlur={handleInputBlur}
							/>
							{mandatoryInputs.email.hasError && (
								<p className={wrapperFormContainerMessage}>
									<Icons.WarningSVG /> {mandatoryInputs.email.error}
								</p>
							)}
						</div>
					</div>
					<div className={wrapperFormContainer}>
						<label htmlFor="title" className={wrapperFormContainerLabel}>
							{reviewTitle.label}
						</label>
						<input
							type="text"
							id="reviewTitle"
							value={mandatoryInputs.reviewTitle.value}
							className={cx(
								wrapperFormContainerInput,
								wrapperFormContainerInputText,
								mandatoryInputs.reviewTitle.hasError && wrapperFormContainerInputError,
							)}
							onChange={handleReviewTitleBlur}
							onBlur={handleReviewTitleBlur}
						/>
						{mandatoryInputs.reviewTitle.hasError && (
							<p className={wrapperFormContainerMessage}>
								<Icons.WarningSVG /> {mandatoryInputs.reviewTitle.error}
							</p>
						)}
					</div>
					<div className={wrapperFormContainer}>
						<label htmlFor="review" className={wrapperFormContainerLabel}>
							{review.label}
						</label>
						<textarea
							id="review"
							onChange={handleTextAreaBlur}
							onBlur={handleTextAreaBlur}
							className={cx(
								wrapperFormContainerInput,
								wrapperFormContainerInputTextarea,
								mandatoryInputs.review.hasError && wrapperFormContainerInputError,
							)}
						/>
						{mandatoryInputs.review.hasError && (
							<p className={wrapperFormContainerMessage}>
								<Icons.WarningSVG /> {mandatoryInputs.review.error}
							</p>
						)}
					</div>
					<div className={wrapperFormContainer}>
						<p className={wrapperFormContainerLabel}>{rating}</p>
						<StarRating
							handleClickCallback={handleStarRatingChange}
							ratingValue={mandatoryInputs.starRating.value}
						/>
						{mandatoryInputs.starRating.hasError && (
							<p className={cx(wrapperFormContainerError, mandatoryInputs.starRating.hasError)}>
								<Icons.WarningSVG /> {mandatoryInputs.starRating.error}
							</p>
						)}
					</div>
					<div className={wrapperFormContainerCheckboxes}>
						<p className={wrapperFormContainerLabel}>{sleepQuality.label}</p>
						<div className={wrapperFormContainerCheckboxesOptions}>
							{Array.from({ length: 5 }).map((value, idx) => (
								<Option
									key={idx}
									onChange={handleSleepQualityRadioInputChange}
									hasError={mandatoryInputs.sleepQuality.hasError}
									idx={idx}
									name={sleepQuality.id}
									active={sleepQltyValueActive}
									setActive={setSleepQltyValueActive}
								/>
							))}
						</div>
						{mandatoryInputs.sleepQuality.hasError && (
							<p className={cx(wrapperFormContainerError, mandatoryInputs.sleepQuality.hasError)}>
								<Icons.WarningSVG /> {mandatoryInputs.sleepQuality.error}
							</p>
						)}
					</div>
					<div className={wrapperFormContainerCheckboxes}>
						<p className={wrapperFormContainerLabel}>{productQuality.label}</p>
						<div className={wrapperFormContainerCheckboxesOptions}>
							{Array.from({ length: 5 }).map((value, idx) => (
								<Option
									key={idx}
									onChange={handleProductQualityRadioInputChange}
									hasError={mandatoryInputs.productQuality.hasError}
									idx={idx}
									name={productQuality.id}
									active={productQltyValueActive}
									setActive={setProductQltyValueActive}
								/>
							))}
						</div>
						{mandatoryInputs.productQuality.hasError && (
							<p className={cx(wrapperFormContainerError, mandatoryInputs.productQuality.hasError)}>
								<Icons.WarningSVG /> {mandatoryInputs.productQuality.error}
							</p>
						)}
					</div>
					<div className={wrapperFormContainerCheckboxes}>
						<p className={wrapperFormContainerLabel}>{comfy.label}</p>
						<div className={wrapperFormContainerCheckboxesOptions}>
							{Array.from({ length: 5 }).map((value, idx) => (
								<Option
									key={idx}
									name={comfy.id}
									onChange={handleComfyRadioInputChange}
									hasError={mandatoryInputs.comfy.hasError}
									idx={idx}
									active={comfyValueActive}
									setActive={setComfyValueActive}
								/>
							))}
						</div>
						{mandatoryInputs.comfy.hasError && (
							<p className={cx(wrapperFormContainerError, mandatoryInputs.comfy.hasError)}>
								<Icons.WarningSVG /> {mandatoryInputs.comfy.error}
							</p>
						)}
					</div>

					<div className={wrapperFormWrapper}>
						<PhotosInput
							onChangeCallback={handleFileInputChange}
							photos={formState.photos}
							handleDeletePhoto={handleDeletePhoto}
						/>
						<div className={wrapperFormWrapperButtons}>
							<button
								onClick={handleClearForm}
								type="button"
								className={cx(wrapperFormWrapperButtonsBtn, wrapperFormWrapperButtonsClear)}
							>
								{clearLabel}
							</button>
							<button
								type="submit"
								id="submit"
								className={cx(wrapperFormWrapperButtonsBtn, wrapperFormWrapperButtonsSubmit)}
							>
								{isLoading ? "Loading..." : buttonLabel}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
