import { type NewsletterProps } from "./types";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperInput } = styles;

export const Newsletter = ({ newsletterInputPlaceholder, newsletterLabel }: NewsletterProps) => {
	return (
		<div className={wrapper}>
			<h3 className={wrapperTitle}>{newsletterLabel}</h3>
			<div className={wrapperInput}>
				<input type="email" placeholder={newsletterInputPlaceholder} />
				<button aria-label="Email">
					<Icons.LetterEmailSVG />
				</button>
			</div>
		</div>
	);
};
