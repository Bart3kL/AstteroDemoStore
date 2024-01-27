"use client";

import Link from "next/link";

import { Spinner } from "@/components/shared/Spinner";

import { cx } from "@/lib/utils";
import { useForm } from "./hooks";

import styles from "./rwd.module.scss";
const {
	wrapper,
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

export const Form = () => {
	const { formState, handleInputBlur, isLoading, handleSubmit } = useForm();

	const { mandatoryInputs } = formState;

	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>Register to our store</h2>
			<p className={wrapperDescription}>Register allows you to manage your subscription</p>
			<form onSubmit={handleSubmit} className={wrapperForm}>
				<div className={wrapperFormBlock}>
					<label htmlFor="firstName">First Name</label>
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
					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						value={mandatoryInputs.lastName.value}
						placeholder="Enter your last name"
						onChange={handleInputBlur}
						onBlur={handleInputBlur}
						className={cx(mandatoryInputs.lastName.hasError && wrapperFormBlockInputError)}
					/>
					{mandatoryInputs.lastName.hasError && (
						<p className={wrapperFormBlockError}>{mandatoryInputs.lastName.error}</p>
					)}
				</div>
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
				<div className={wrapperBtn}>
					<button type="submit" id="submit">
						{isLoading ? <Spinner /> : "Register"}
					</button>
				</div>
			</form>
			<div className={wrapperRegister}>
				<p>{"Already have an account?"}</p>
				<button className={wrapperBtnAction}>
					<Link href="/account/login">Login</Link>
				</button>
			</div>
		</div>
	);
};
