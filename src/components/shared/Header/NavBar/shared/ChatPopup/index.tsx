import Link from "next/link";

import type { ChatPopupProps } from "./types";
import { Icons } from "@/lib";
import { cx } from "@/lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive, wrapperServices } = styles;

export const ChatPopup = ({
	isActive,
	modalAddRef,
	title,
	contactPageRedirection,
	contactUsLabel,
	phoneNumber,
	startChatLabel,
}: ChatPopupProps) => {
	return (
		<div className={cx(wrapper, isActive && wrapperActive)} ref={modalAddRef}>
			<h4>{title}</h4>
			<h3>
				<Link href={`tel:+48${phoneNumber.replace(/\s|-/g, "")}`}>{phoneNumber}</Link>
			</h3>
			<div className={wrapperServices}>
				<Link href="/">
					<Icons.ChatSVG />
					<p>{startChatLabel}</p>
				</Link>
				<Link href={contactPageRedirection}>
					<Icons.LetterSVG />
					<p>{contactUsLabel}</p>
				</Link>
			</div>
		</div>
	);
};
