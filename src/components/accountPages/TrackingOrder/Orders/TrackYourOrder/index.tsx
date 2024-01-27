import { SearchInput } from "./SearchInput";
import { Spinner } from "@/components/shared/Spinner";

import { type TrackYourOrderProps } from "./types";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentTitle,
	wrapperContentButton,
	error,
	errorDescription,
} = styles;

export const TrackYourOrder = ({
	isActive,
	handleFocus,
	orderId,
	handleOrderId,
	handleBlur,
	handleSubmit,
	isError,
	inputPlaceholder,
	errorLabel,
	buttonLabel,
	title,
	noTrackingDescription,
	noTrackingUpdatesLabel,
	isLoading,
}: TrackYourOrderProps) => {
	return (
		<>
			<div className={wrapper}>
				<div className={wrapperContent}>
					<h2 className={wrapperContentTitle}>{title}</h2>
					<form onSubmit={handleSubmit}>
						<SearchInput
							isActive={isActive}
							handleFocus={handleFocus}
							orderId={orderId}
							handleOrderId={handleOrderId}
							handleBlur={handleBlur}
							inputPlaceholder={inputPlaceholder}
							errorLabel={errorLabel}
							isError={isError}
						/>
						<button className={wrapperContentButton} type="submit">
							{isLoading ? <Spinner /> : buttonLabel}
						</button>
					</form>
				</div>
			</div>
			{isError && (
				<div className={error}>
					<h2 className={wrapperContentTitle}>{noTrackingUpdatesLabel}</h2>
					<p className={errorDescription}>{noTrackingDescription}</p>
				</div>
			)}
		</>
	);
};
