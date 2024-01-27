import Link from "next/link";

import { Spinner } from "@/components/shared/Spinner";

import type { FormProps } from "./types";
import { cx } from "@/lib/utils";
import { useForm } from "./hooks";

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
	wrapperRegister,
} = styles;

export const Form = ({ handleToggle, isCurrentForm }: FormProps) => {
	const { formState, handleInputBlur, isLoading, handleSubmit, error } = useForm();

	const { mandatoryInputs } = formState;

	return (
		<div className={cx(wrapper, isCurrentForm && wrapperActive)}>
			<h2 className={wrapperTitle}>Login to our store</h2>
			<p className={wrapperDescription}>Login allows you to manage your subscription</p>
			<form onSubmit={handleSubmit} className={wrapperForm}>
				<div className={wrapperFormBlock}>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						value={mandatoryInputs.email.value}
						placeholder="Enter your email"
						onChange={handleInputBlur}
						onBlur={handleInputBlur}
						className={cx(mandatoryInputs.email.hasError && wrapperFormBlockInputError)}
					/>
					{mandatoryInputs.email.hasError && (
						<p className={wrapperFormBlockError}>{mandatoryInputs.email.error}</p>
					)}
				</div>
				<div className={wrapperFormBlock}>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={mandatoryInputs.password.value}
						placeholder="******"
						onChange={handleInputBlur}
						onBlur={handleInputBlur}
						className={cx(mandatoryInputs.password.hasError && wrapperFormBlockInputError)}
					/>
					{mandatoryInputs.password.hasError && (
						<p className={wrapperFormBlockError}>{mandatoryInputs.password.error}</p>
					)}
				</div>
				{error && <p className={wrapperFormBlockError}>{error}</p>}
				<div className={wrapperBtn}>
					<button type="submit" id="submit">
						{isLoading ? <Spinner /> : "Login"}
					</button>
				</div>
			</form>

			<button className={wrapperBtnAction} onClick={handleToggle}>
				Forgot your password?
			</button>

			<div className={wrapperRegister}>
				<p>{"Don't have an account?"}</p>
				<button className={wrapperBtnAction}>
					<Link href="/account/register">Register</Link>
				</button>
			</div>
		</div>
	);
};
