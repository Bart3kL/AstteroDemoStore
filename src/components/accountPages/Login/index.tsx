"use client";

import { useState } from "react";

import { Banner } from "../shared/Banner";
import { BreadCrumbs } from "../shared/BreadCrumbs";
import { Form } from "./Form";
import { ResetPasswordForm } from "./ResetPasswordForm";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent } = styles;

export const Login = () => {
	const [currentForm, setCurrentForm] = useState<"login" | "resetForm">("login");
	return (
		<div className={wrapper}>
			<BreadCrumbs breadCrumbs={[{ title: "Home", handle: "/" }]} title={"Login"} />

			<div className={wrapperContent}>
				<div>
					<Form
						handleToggle={() => setCurrentForm("resetForm")}
						isCurrentForm={currentForm === "login"}
					/>

					<ResetPasswordForm
						handleToggle={() => setCurrentForm("login")}
						isCurrentForm={currentForm === "resetForm"}
					/>
				</div>

				<Banner src="https://cdn.shopify.com/s/files/1/0830/0819/2813/files/pexels-anastasiya-gepp-2065195.jpg?v=1698661148" />
			</div>
		</div>
	);
};
