import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

export const useMobileBottomPanel = () => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [isShown, setIsShown] = useState(true);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		if (jsEnabled && typeof window !== "undefined" && typeof document !== "undefined") {
			const handleScroll = throttle(() => {
				const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 640;

				if (window.scrollY > scrollThreshold) {
					setIsShown(false);
					return;
				} else if (window.scrollY > 1340) {
					setIsShown(true);
				} else if (window.scrollY <= 600) {
					setIsShown(true);
				} else {
					setIsShown(false);
				}
			}, 200);

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, [jsEnabled]);

	return {
		isShown,
	};
};
