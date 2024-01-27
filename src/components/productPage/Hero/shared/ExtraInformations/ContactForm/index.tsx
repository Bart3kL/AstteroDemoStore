import { Spinner } from "../../../../../shared/Spinner";

import type { ContactFormProps } from "./types";
import { useForm } from "./hooks";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperTitle,
	wrapperForm,
	wrapperFormBlock,
	wrapperBtn,
	wrapperFormBlockError,
	wrapperFormBlockInputError,
} = styles;

export const ContactForm = ({ handleToggle }: ContactFormProps) => {
	const { formState, handleInputBlur, isLoading, handleSubmit } = useForm(handleToggle);

	const { mandatoryInputs } = formState;

	return (
		<div className={wrapper}>
			<h3 className={wrapperTitle}>Have a question?</h3>
			<form className={wrapperForm} onSubmit={handleSubmit}>
				<div className={wrapperFormBlock}>
					<label htmlFor="firstName">Name</label>
					<input
						type="text"
						id="firstName"
						value={mandatoryInputs.firstName.value}
						placeholder="Enter your first name"
						onChange={handleInputBlur}
						onBlur={handleInputBlur}
						className={cx(mandatoryInputs.firstName.hasError && wrapperFormBlockInputError)}
					/>
					{mandatoryInputs.firstName.hasError && (
						<p className={wrapperFormBlockError}>{mandatoryInputs.firstName.error}</p>
					)}
				</div>
				<div className={wrapperFormBlock}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						value={mandatoryInputs.email.value}
						placeholder="Enter your first name"
						onChange={handleInputBlur}
						onBlur={handleInputBlur}
						className={cx(mandatoryInputs.email.hasError && wrapperFormBlockInputError)}
					/>
					{mandatoryInputs.email.hasError && (
						<p className={wrapperFormBlockError}>{mandatoryInputs.email.error}</p>
					)}
				</div>
				<div className={wrapperFormBlock}>
					<label htmlFor="message">Message</label>
					<textarea
						name=""
						id="message"
						value={mandatoryInputs.message.value}
						onChange={handleInputBlur}
						onBlur={handleInputBlur}
						className={cx(mandatoryInputs.message.hasError && wrapperFormBlockInputError)}
					></textarea>
					{mandatoryInputs.message.hasError && (
						<p className={wrapperFormBlockError}>{mandatoryInputs.message.error}</p>
					)}
				</div>
				<div className={wrapperBtn}>
					<button type="submit" id="submit">
						{isLoading ? <Spinner /> : "Ask our consultant"}
					</button>
				</div>
			</form>
		</div>
	);
};
