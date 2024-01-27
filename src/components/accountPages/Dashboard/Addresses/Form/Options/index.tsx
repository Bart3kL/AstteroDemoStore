import { useState } from "react";

import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { type OptionsProps } from "./types";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperLabel,
	wrapperInput,
	wrapperInputError,
	wrapperOptions,
	wrapperInputOption,
	wrapperError,
	wrapperInputIcon,
} = styles;

export const Options = ({
	hasError,
	error,
	countries,
	countryLabel,
	handleChange,
	selectedOption,
	id,
}: OptionsProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOptions = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionSelect = (selectedValue: string, id: string) => {
		handleChange(selectedValue, id);
		setIsOpen(false);
	};
	return (
		<div className={wrapper}>
			<label htmlFor="firstName" className={wrapperLabel} onClick={toggleOptions}>
				{countryLabel}
			</label>
			<div>
				<li
					className={cx(wrapperInput, hasError && wrapperInputError)}
					onClick={toggleOptions}
					id={id}
				>
					{selectedOption}
					<p className={cx(isOpen && wrapperInputIcon)}>
						<Icons.ArrowDownSVG />
					</p>
				</li>
				{isOpen && (
					<ul className={wrapperOptions}>
						{countries.map((option) => (
							<li
								key={option.name}
								className={cx(wrapperInput, wrapperInputOption)}
								onClick={() => handleOptionSelect(option.name, id)}
							>
								{option.name}
							</li>
						))}
					</ul>
				)}
			</div>
			<p className={wrapperError}>{error}</p>
		</div>
	);
};
