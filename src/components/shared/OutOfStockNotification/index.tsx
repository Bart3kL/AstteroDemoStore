"use client";

import { Spinner } from "../Spinner";
import { Portal } from "../Modal/Portal";
import { Curtain } from "../Modal/Curtain";

import { cx } from "@/lib/utils";
import { useForm } from "./hooks";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";
import { useOutOfStockNotificationStatePropsState } from "@/lib/zustand/outOfStockNotification";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentActive,
	wrapperContentForm,
	wrapperContentFormBlock,
	wrapperContentFormBlockInputError,
	wrapperContentFormBlockError,
	wrapperContentBtns,
} = styles;

export const OutOfStockNotification = () => {
	const zustand = useOutOfStockNotificationStatePropsState();

	const { formState, handleInputBlur, isLoading, handleSubmit } = useForm(
		zustand.handleToggle,
		zustand.currentVariantId,
	);

	useBlockScroll(zustand.isActive);

	const { mandatoryInputs } = formState;

	return (
		<Portal>
			<div className={cx(wrapper)}>
				<Curtain
					show={zustand.isActive}
					onClose={() => zustand.handleToggle()}
					curtainClose={true}
					curtainColor={"black"}
				/>
				<div className={cx(wrapperContent, zustand.isActive && wrapperContentActive)}>
					<h4>You will be notified when this product is in stock</h4>
					<form onSubmit={handleSubmit} className={wrapperContentForm}>
						<div className={wrapperContentFormBlock}>
							<label htmlFor="firstName">Name</label>
							<input
								type="text"
								id="firstName"
								value={mandatoryInputs.firstName.value}
								placeholder="Enter your first name"
								onChange={handleInputBlur}
								onBlur={handleInputBlur}
								className={cx(
									mandatoryInputs.firstName.hasError && wrapperContentFormBlockInputError,
								)}
							/>
							{mandatoryInputs.firstName.hasError && (
								<p className={wrapperContentFormBlockError}>{mandatoryInputs.firstName.error}</p>
							)}
						</div>
						<div className={wrapperContentFormBlock}>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								value={mandatoryInputs.email.value}
								placeholder="Enter your first name"
								onChange={handleInputBlur}
								onBlur={handleInputBlur}
								className={cx(mandatoryInputs.email.hasError && wrapperContentFormBlockInputError)}
							/>
							{mandatoryInputs.email.hasError && (
								<p className={wrapperContentFormBlockError}>{mandatoryInputs.email.error}</p>
							)}
						</div>
						<div className={wrapperContentBtns}>
							<button type="button" onClick={() => zustand.handleToggle()}>
								Cancel
							</button>
							<button type="submit" id="submit">
								{isLoading ? <Spinner /> : "Confirm"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</Portal>
	);
};
