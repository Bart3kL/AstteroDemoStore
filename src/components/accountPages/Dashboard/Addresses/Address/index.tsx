import { useTransition, useState } from "react";

import { useRouter } from "next/navigation";

import { Spinner } from "@/components/shared/Spinner";
import { Form } from "../Form";

import type { AddressPropss } from "./types";
import { cx } from "@/lib/utils";
import {
	setDefaultCustomerAddress,
	deleteCustomerAddress,
} from "@/lib/shopify/functions/account/actions";

import styles from "./rwd.module.scss";
import { Icons } from "@/lib";
const {
	wrapper,
	wrapperDefault,
	wrapperAddress,
	wrapperAddressName,
	wrapperAddressLine,
	wrapperAddressBtns,
	wrapperAddressBtnsEdit,
	wrapperAddressBtnsDefault,
	wrapperDelete,
} = styles;

export const Address = ({
	address1,
	address2,
	city,
	country,
	firstName,
	lastName,
	zip,
	province,
	phone,
	id,
	defaultAddressId,
}: AddressPropss) => {
	const [isPending, startTransition] = useTransition();
	const [showEditForm, setShowEditForm] = useState(false);

	const router = useRouter();

	return (
		<div className={cx(wrapper, defaultAddressId === id && wrapperDefault)}>
			<div className={wrapperAddress}>
				<p className={wrapperAddressName}>
					{firstName} {lastName}
				</p>

				<p>
					<span>{address1} </span>
					<span>{address2}</span>
				</p>
				<div className={wrapperAddressLine}>
					<p>{zip}</p>
					<p>{city} </p>
				</div>
				<div className={wrapperAddressLine}>
					<p>{province} </p>
				</div>
				<div className={wrapperAddressLine}>
					<p>{country}</p>
				</div>
				<div className={wrapperAddressLine}>
					<p>{phone}</p>
				</div>
			</div>

			<div className={wrapperAddressBtns}>
				<button className={wrapperAddressBtnsEdit} onClick={() => setShowEditForm(true)}>
					Edit
				</button>
				{defaultAddressId !== id && (
					<button
						className={wrapperAddressBtnsDefault}
						onClick={() =>
							startTransition(async () => {
								await setDefaultCustomerAddress(id);

								router.refresh();
							})
						}
					>
						{isPending ? <Spinner /> : "Set default"}
					</button>
				)}
			</div>
			<button
				aria-label="Close"
				className={wrapperDelete}
				onClick={async () => {
					await deleteCustomerAddress(id);

					router.refresh();
				}}
			>
				<Icons.CloseSVG />
			</button>
			<Form
				showAddressForm={showEditForm}
				setShowAddressForm={setShowEditForm}
				title={"Update Address"}
				editFormContent={{
					address1,
					address2,
					city,
					country,
					firstName,
					lastName,
					zip,
					province,
					phone,
					id,
				}}
			/>
		</div>
	);
};
