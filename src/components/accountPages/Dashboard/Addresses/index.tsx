import { useState } from "react";

import { Form } from "./Form";
import { Address } from "./Address";

import type { AddressesProps } from "./types";
import { cx } from "@/lib/utils";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperActive,
	wrapperTitle,
	wrapperLogout,
	wrapperList,
	wrapperEmptyList,
	wrapperBtn,
} = styles;

export const Addresses = ({
	showAddress,
	setShowAddress,
	addresses,
	defaultAddressId,
}: AddressesProps) => {
	const [showAddressForm, setShowAddressForm] = useState(false);

	useBlockScroll(showAddressForm);

	return (
		<div className={cx(wrapper, showAddress && wrapperActive)}>
			<h2 className={wrapperTitle}>
				<p>Manage Addresses</p>
			</h2>
			<div className={wrapperLogout} onClick={() => setShowAddress(false)}>
				<button>
					<Icons.ArrowLeftSVG />
					Back
				</button>
			</div>
			{addresses && defaultAddressId ? (
				<div className={wrapperList}>
					{addresses.map((address, idx) => (
						<Address
							key={address.address1 + idx}
							{...address}
							defaultAddressId={defaultAddressId.id}
						/>
					))}
				</div>
			) : (
				<div className={wrapperEmptyList}>Your address board is empty. Add your first address </div>
			)}
			<button className={wrapperBtn} onClick={() => setShowAddressForm(true)}>
				Add new address
			</button>
			<Form
				showAddressForm={showAddressForm}
				setShowAddressForm={setShowAddressForm}
				title={"Add Address"}
			/>
		</div>
	);
};
