import type { HeaderCacheProps } from "../../../types";

export type ChatPopupProps = HeaderCacheProps["chat"] & {
	isActive: boolean;
	modalAddRef: React.RefObject<HTMLDivElement>;
};
