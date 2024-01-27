import { Newsletter } from "./Newsletter";
import { Block } from "./Block";
import { Payment } from "./Payment";

import { type FooterProps } from "./types";
import { Icons } from "@/lib";

import styles from "./rwd.module.scss";
const {
	wrapper,
	wrapperContent,
	wrapperContentHeader,
	wrapperContentHeaderIcons,
	wrapperCopyright,
	wrapperPayments,
} = styles;

export const Footer = ({
	blocks,
	copyright,
	newsletterInputPlaceholder,
	newsletterLabel,
	payments,
	description,
}: FooterProps) => {
	return (
		<div className={wrapper}>
			<Newsletter
				newsletterInputPlaceholder={newsletterInputPlaceholder}
				newsletterLabel={newsletterLabel}
			/>
			<div className={wrapperContent}>
				<div className={wrapperContentHeader}>
					<Icons.LogoDesktopSVG />
					<p>{description}</p>
					<div className={wrapperContentHeaderIcons}>
						<Icons.InstagramSVG />
						<Icons.FacebookSVG />
						<Icons.TiktokSVG />
						<Icons.XSVG />
						<Icons.YouTubeSVG />
					</div>
				</div>
				{blocks.map((block, idx) => (
					<Block key={block.title + idx} {...block} />
				))}
			</div>
			<p className={wrapperCopyright}>{copyright}</p>
			<div className={wrapperPayments}>
				{payments.map((payment, idx) => (
					<Payment {...payment} key={payment.image.url + idx} />
				))}
			</div>
		</div>
	);
};
