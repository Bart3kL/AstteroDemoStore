import { useState } from "react";

import { Modal } from "../Modal";
import { Share } from "./Share";
import { ContactForm } from "./ContactForm";
import { DeliveryAndReturn } from "./DeliveryAndReturn";
import { Size } from "./Size";

import type { ExtraInformationsProps } from "./types";
import { Icons } from "@/lib";
import { useBlockScroll } from "@/lib/hooks/useBlockScroll";

import styles from "./rwd.module.scss";
const { wrapper, wrapperContent } = styles;

export const ExtraInformations = ({ title, image }: ExtraInformationsProps) => {
	const [showModal, setShowModal] = useState({ isShown: false, type: "" });

	useBlockScroll(showModal.isShown);
	return (
		<div className={wrapper}>
			<div className={wrapperContent}>
				<button onClick={() => setShowModal({ isShown: true, type: "share" })}>
					<Icons.ShareSVG />
					Share
				</button>
				<button onClick={() => setShowModal({ isShown: true, type: "form" })}>
					<Icons.AskLetterSVG />
					Ask about this product
				</button>
				<button onClick={() => setShowModal({ isShown: true, type: "size" })}>
					<Icons.SizeGuideSVG />
					Sizing guide
				</button>
				<button onClick={() => setShowModal({ isShown: true, type: "delivery" })}>
					<Icons.DeliveryAndReturnSVG />
					Delivery and return
				</button>
			</div>

			<Modal
				handleToggle={() => setShowModal({ isShown: !showModal.isShown, type: showModal.type })}
				isActive={showModal.isShown}
			>
				{showModal.type === "share" && <Share title={title} image={image} />}
				{showModal.type === "form" && (
					<ContactForm
						handleToggle={() => setShowModal({ isShown: !showModal.isShown, type: showModal.type })}
					/>
				)}
				{showModal.type === "size" && (
					<Size
						handleToggle={() => setShowModal({ isShown: !showModal.isShown, type: showModal.type })}
					/>
				)}
				{showModal.type === "delivery" && (
					<DeliveryAndReturn
						handleToggle={() => setShowModal({ isShown: !showModal.isShown, type: showModal.type })}
					/>
				)}
			</Modal>
		</div>
	);
};
