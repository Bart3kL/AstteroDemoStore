import { type SearchInputProps } from "./types";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContainer,
	wrapperContainerError,
	wrapperContainerLabel,
	wrapperContainerInput,
	wrapperContainerInputActive,
	wrapperContainerLabelActive,
	wrapperError,
} = styles;

export const SearchInput = ({
	isActive,
	handleFocus,
	orderId,
	handleOrderId,
	errorLabel,
	inputPlaceholder,
	handleBlur,
	isError,
}: SearchInputProps) => {
	return (
		<div className={wrapper}>
			<div className={cx(wrapperContainer, isError && wrapperContainerError)}>
				<label className={cx(wrapperContainerLabel, isActive && wrapperContainerLabelActive)}>
					<span
						style={{
							overflow: "hidden",
							textOverflow: "ellipsis",
							whiteSpace: "nowrap",
							display: "block",
							width: "100%",
							maxHeight: "18px",
						}}
						className="no-translate"
					>
						{inputPlaceholder}
					</span>
				</label>
				<input
					className={cx(wrapperContainerInput, isActive && wrapperContainerInputActive)}
					onChange={handleOrderId}
					onFocus={handleFocus}
					onBlur={handleBlur}
					value={typeof orderId === "string" ? orderId : undefined}
					type="number"
					autoComplete="no"
				/>
			</div>
			{isError && <p className={wrapperError}>{errorLabel}</p>}
		</div>
	);
};
