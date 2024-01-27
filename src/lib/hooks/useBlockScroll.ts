import { useEffect } from "react";

export const useBlockScroll = (show: boolean) => [
	useEffect(() => {
		if (show) {
			document.documentElement.style.overflow = "hidden";

			return () => {
				document.documentElement.style.overflow = "unset";
			};
		}
	}, [show]),
];
