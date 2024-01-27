import { Banner } from "../shared/Banner";
import { BreadCrumbs } from "../shared/BreadCrumbs";
import { Form } from "./Form";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent } = styles;

export const Register = () => {
	return (
		<div className={wrapper}>
			<BreadCrumbs breadCrumbs={[{ title: "Home", handle: "/" }]} title={"Register"} />
			<div className={wrapperContent}>
				<Form />
				<Banner
					src={
						"https://cdn.shopify.com/s/files/1/0830/0819/2813/files/pexels-andrea-yurko-982585.jpg?v=1698661152"
					}
				/>
			</div>
		</div>
	);
};
