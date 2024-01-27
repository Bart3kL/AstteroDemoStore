import { Options } from "./Options";
import { Input } from "./Input";
import { Spinner } from "@/components/shared/Spinner";
import { Portal } from "@/components/shared/Modal/Portal";
import { Curtain } from "@/components/shared/Modal/Curtain";

import type { FormProps } from "./types";
import { cx } from "@/lib/utils";
import { useShippingAddressForm } from "./hooks";
import { isFormInvalid } from "./utils";
import { Icons } from "@/lib";
import { countries } from "./countries";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperExit,
	wrapperTitle,
	wrapperActive,
	wrapperForm,
	wrapperFormBtn,
	wrapperFormBtnInactive,
} = styles;

export const Form = ({
	showAddressForm,
	setShowAddressForm,
	title,
	editFormContent,
}: FormProps) => {
	const { formState, error, isPending, handleInputBlur, handleSubmit, handleCountry } =
		useShippingAddressForm(setShowAddressForm, editFormContent);
	const { mandatoryInputs } = formState;

	return (
		<Portal>
			<Curtain
				show={showAddressForm}
				onClose={() => setShowAddressForm(false)}
				curtainClose={true}
				curtainColor={"black"}
			/>
			<div className={cx(wrapper, showAddressForm && wrapperActive)}>
				<div className={wrapperExit}>
					<button onClick={() => setShowAddressForm(false)} aria-label="Close">
						<Icons.CloseSVG />
					</button>
				</div>
				<h2 className={wrapperTitle}>
					<p>{title}</p>
				</h2>
				<form onSubmit={handleSubmit} className={wrapperForm}>
					<Options
						id="country"
						hasError={mandatoryInputs.country.hasError}
						error={mandatoryInputs.country.error}
						countries={countries}
						selectedOption={mandatoryInputs.country.value}
						handleChange={handleCountry}
						countryLabel={"Country"}
					/>
					<Input
						value={mandatoryInputs.name.value}
						hasError={mandatoryInputs.name.hasError}
						error={mandatoryInputs.name.error}
						id="name"
						type="text"
						handleInputBlur={handleInputBlur}
						label="Full Name"
						placeholder="Nehuen Odriozola"
					/>
					<Input
						value={mandatoryInputs.street.value}
						hasError={mandatoryInputs.street.hasError}
						error={mandatoryInputs.street.error}
						id="street"
						type="text"
						handleInputBlur={handleInputBlur}
						label="Address"
						placeholder="6600 NE 78th CT"
					/>
					<Input
						value={mandatoryInputs.apartment.value}
						hasError={mandatoryInputs.apartment.hasError}
						error={mandatoryInputs.apartment.error}
						id="apartment"
						type="text"
						handleInputBlur={handleInputBlur}
						label="Apartment, suite, etc."
						placeholder="123"
						optional
					/>
					<Input
						value={mandatoryInputs.city.value}
						hasError={mandatoryInputs.city.hasError}
						error={mandatoryInputs.city.error}
						id="city"
						type="text"
						handleInputBlur={handleInputBlur}
						label="City"
						placeholder="Portland"
					/>
					<Input
						value={mandatoryInputs.state.value}
						hasError={mandatoryInputs.state.hasError}
						error={mandatoryInputs.state.error}
						id="state"
						type="text"
						handleInputBlur={handleInputBlur}
						label="State"
						placeholder="Oregon"
					/>
					<Input
						value={mandatoryInputs.zipCode.value}
						hasError={mandatoryInputs.zipCode.hasError}
						error={mandatoryInputs.zipCode.error}
						id="zipCode"
						type="text"
						handleInputBlur={handleInputBlur}
						label="ZIP Code"
						placeholder="97218"
					/>

					<Input
						value={mandatoryInputs.phone.value}
						hasError={mandatoryInputs.phone.hasError}
						error={mandatoryInputs.phone.error}
						id="phone"
						type="number"
						handleInputBlur={handleInputBlur}
						label="Phone Number"
						placeholder="555-555-5555"
					/>

					{!isFormInvalid(mandatoryInputs) ? (
						<button type="submit" id="submit" className={wrapperFormBtn}>
							{isPending ? <Spinner /> : "Confirm"}
						</button>
					) : (
						<button className={cx(wrapperFormBtn, wrapperFormBtnInactive)}>Confirm</button>
					)}
					{error && (
						<div>
							{error.map((error, idx) => (
								<div key={error + idx}>{error}</div>
							))}
						</div>
					)}
				</form>
			</div>
		</Portal>
	);
};
