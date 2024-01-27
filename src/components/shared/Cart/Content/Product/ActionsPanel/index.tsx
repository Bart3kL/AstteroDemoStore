import { useRouter } from "next/navigation";
import { useTransition } from "react";

import type { ActionsPanelProps } from "./types";
import { cx } from "@/lib/utils";
import { Icons } from "@/lib";
import { removeItem } from "@/lib/shopify/functions/cart/actions";

import styles from "./rwd.module.scss";
const { wrapper, wrapperActive, wrapperEdit, wrapperTrash } = styles;

export const ActionsPanel = ({
	showOptions,
	setEdit,
	edit,
	lineId,
	resetChangedVariantToDefault,
}: ActionsPanelProps) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	return (
		<div className={cx(wrapper, showOptions && wrapperActive)}>
			<div className={wrapperEdit}>
				<button
					onClick={() => {
						setEdit(!edit);

						if (edit) {
							resetChangedVariantToDefault();
						}
					}}
				>
					{edit ? <Icons.CloseSVG /> : <Icons.EditSVG />}
					Edit
				</button>
			</div>
			<div className={wrapperTrash}>
				<button
					aria-label="Pending or trash"
					onClick={() => {
						startTransition(async () => {
							const error = await removeItem(lineId);

							if (error) {
								throw new Error(error.toString());
							}

							router.refresh();
						});
					}}
					disabled={isPending}
				>
					{isPending ? <Icons.LoadingDotsSVG /> : <Icons.EmptyTrashSVG />}
				</button>
			</div>
		</div>
	);
};
