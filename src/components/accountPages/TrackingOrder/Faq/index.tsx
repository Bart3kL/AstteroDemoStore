import { Block } from "./Block";

import { type FaqProps } from "./types";

import styles from "./rwd.module.scss";
const { wrapper, wrapperTitle, wrapperFaqs } = styles;

export const Faq = ({ title, faqs }: FaqProps) => {
	return (
		<div className={wrapper}>
			<h2 className={wrapperTitle}>{title}</h2>
			<div className={wrapperFaqs}>
				{faqs.map((faq, idx) => (
					<Block {...faq} key={faq.question + idx} />
				))}
			</div>
		</div>
	);
};
