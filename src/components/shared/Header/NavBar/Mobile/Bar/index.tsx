import Link from "next/link";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { ChatPopup } from "../../shared/ChatPopup";
import { Search } from "../../shared/Search";

import type { BarProps } from "./types";
import { Icons } from "@/lib";

import { useModal } from "@/lib/hooks/useModal";

import styles from "./rwd.module.scss";
const { wrapper, wrapperLogo, wrapperLinks, wrapperLinksItem } = styles;

export const Bar = ({ handleToggleMenu, preparedProducts, searchData, chatData }: BarProps) => {
	const { isActive, handleClose, handleOpen, modalAddRef, type } = useModal();

	const searchParams = useSearchParams();

	const search = searchParams.get("search");

	useEffect(() => {
		if (search) {
			handleOpen("search");
		}
	}, [search, handleOpen]);

	return (
		<>
			<div className={wrapper}>
				<Link className={wrapperLogo} href="/" aria-label="Asttero logo">
					<Icons.LogoMobileSVG />
					<Icons.LogoDesktopSVG />
				</Link>
				<div className={wrapperLinks}>
					<div className={wrapperLinksItem}>
						{isActive && type === "chat" ? (
							<p onClick={() => handleClose()}>
								<Icons.ExitSVG />
							</p>
						) : (
							<p onClick={() => handleOpen("chat")}>
								<Icons.ChatSVG />
							</p>
						)}
					</div>
					<Link
						aria-label="phone number"
						href={`tel:+48${chatData.phoneNumber.replace(/\s|-/g, "")}`}
						className={wrapperLinksItem}
					>
						<Icons.PhoneSVG />
					</Link>
					<div className={wrapperLinksItem}>
						{isActive && type === "search" ? (
							<p onClick={() => handleClose()}>
								<Icons.ExitSVG />
							</p>
						) : (
							<p onClick={() => handleOpen("search")}>
								<Icons.SearchSVG />
							</p>
						)}
					</div>
					<p className={wrapperLinksItem} onClick={handleToggleMenu}>
						<Icons.NavPanelSVG />
					</p>
				</div>
			</div>
			<ChatPopup
				isActive={isActive && type === "chat" ? true : false}
				modalAddRef={modalAddRef}
				{...chatData}
			/>

			<Search
				isActive={isActive && type === "search" ? true : false}
				modalAddRef={modalAddRef}
				preparedProducts={preparedProducts}
				searchData={searchData}
			/>
		</>
	);
};
