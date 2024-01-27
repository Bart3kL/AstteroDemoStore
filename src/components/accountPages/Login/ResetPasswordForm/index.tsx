import { Spinner } from "@/components/shared/Spinner";

import type { ResetPasswordFormProps } from "./types";
import { cx } from "@/lib/utils";
import { useForm } from "./hooks";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperTitle,
	wrapperDescription,
	wrapperForm,
	wrapperFormBlock,
	wrapperFormBlockInputError,
	wrapperFormBlockError,
	wrapperBtn,
	wrapperBtnAction,
} = styles;

export const ResetPasswordForm = ({ handleToggle, isCurrentForm }: ResetPasswordFormProps) => {
	const { formState, handleInputBlur, isLoading, handleSubmit } = useForm();

	const { mandatoryInputs } = formState;

	return (
		<div className={cx(wrapper, isCurrentForm && wrapperActive)}>
			<h2 className={wrapperTitle}>Reset your password</h2>
			<p className={wrapperDescription}>We will send you an email to reset your password</p>
			<form onSubmit={handleSubmit} className={wrapperForm}>
				<div className={wrapperFormBlock}>
					<label htmlFor="email">Email</label>
					<input
						type="text"
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

				<div className={wrapperBtn}>
					<button type="submit" id="submit">
						{isLoading ? <Spinner /> : "send"}
					</button>
				</div>
			</form>

			<button className={wrapperBtnAction} onClick={handleToggle}>
				<Icons.ArrowLeftSVG />
				Back
			</button>
		</div>
	);
};
