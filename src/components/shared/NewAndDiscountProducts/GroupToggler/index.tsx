import type { GroupTogglerProps } from "./types";
import { cx } from "../../../../lib/utils";

import styles from "./rwd.module.scss";
const { wrapper, wrapperLabel, wrapperLabelActive, wrapperIndicator } = styles;

export const GroupToggler = ({ activeGroup, setActiveGroup, groups }: GroupTogglerProps) => {
	const isNewActive = activeGroup.toLowerCase() === "new";

	const activeStyle = {
		left: isNewActive ? "0" : "calc(100%/2)",
	};

	return (
		<div className={wrapper}>
			{groups.map((group, idx) => (
				<div
					key={group + idx}
					className={cx(
						wrapperLabel,
						activeGroup.toLowerCase() === group.toLowerCase() && wrapperLabelActive,
					)}
					onClick={() => setActiveGroup(group)}
				>
					{group}
				</div>
			))}
			<div className={wrapperIndicator} style={activeStyle} />
		</div>
	);
};
