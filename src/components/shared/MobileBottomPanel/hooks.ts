import { useState, useEffect } from "react";
import throttle from "lodash.throttle";

export const useMobileBottomPanel = () => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		if (jsEnabled && typeof window !== "undefined" && typeof document !== "undefined") {
			const handleScroll = throttle(() => {
				if (window.innerWidth >= 993) return;

				const scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 640;

				if (window.scrollY < 200 || window.scrollY > scrollThreshold) {
					setIsShown(false);
					return;
				}

				setIsShown(true);
			}, 200);

			setIsShown(window.scrollY >= 200);

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
