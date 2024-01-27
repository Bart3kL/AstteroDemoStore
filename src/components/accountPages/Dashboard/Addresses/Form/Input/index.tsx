import { cx } from "@/lib/utils";
import { type InputProps } from "./types";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperLabel,
	wrapperLabelOptional,
	wrapperInput,
	wrapperInputError,
	wrapperError,
} = styles;

export const Input = ({
	value,
	hasError,
	error,
	handleInputBlur,
	label,
	id,
	type,
	placeholder,
	optional,
}: InputProps) => {
	return (
		<div className={wrapper}>
			<label htmlFor="firstName" className={wrapperLabel}>
				{label} {optional && <p className={wrapperLabelOptional}>(optional)</p>}
			</label>
			<input
				type={type}
				id={id}
				placeholder={placeholder}
				value={value}
				className={cx(wrapperInput, hasError && wrapperInputError)}
				onBlur={handleInputBlur}
				onChange={handleInputBlur}
			/>
			<p className={wrapperError}>{error}</p>
		</div>
	);
};
