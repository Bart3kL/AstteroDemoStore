"use client";

import { useState } from "react";
import Link from "next/link";

import { BreadCrumbs } from "../shared/BreadCrumbs";
import { Addresses } from "./Addresses";

import type { DashBoardProps } from "./types";
import { Icons } from "@/lib";
import { handleLogout } from "./utils";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentActive,
	wrapperContentTitle,
	wrapperContentLogout,
	wrapperContentActions,
} = styles;

export const Dashboard = ({ firstName, lastName, addresses, defaultAddress }: DashBoardProps) => {
	const [showAddress, setShowAddress] = useState(false);

	return (
		<div className={wrapper}>
			<BreadCrumbs breadCrumbs={[{ title: "Home", handle: "/" }]} title={"Account"} />

			<div className={cx(wrapperContent, !showAddress && wrapperContentActive)}>
				<h2 className={wrapperContentTitle}>
					<p>{firstName}</p>
					<p>{lastName}</p>
				</h2>
				<form action={handleLogout} className={wrapperContentLogout}>
					<button>
						<Icons.LogoutSVG />
						Logout
					</button>
				</form>
				<div className={wrapperContentActions}>
					<button>
						<Link href="/account/tracking-order">Orders</Link>
					</button>
					<button onClick={() => setShowAddress(true)}>Addresses</button>
				</div>
			</div>
			<Addresses
				showAddress={showAddress}
				setShowAddress={setShowAddress}
				addresses={addresses}
				defaultAddressId={defaultAddress}
			/>
		</div>
	);
};
