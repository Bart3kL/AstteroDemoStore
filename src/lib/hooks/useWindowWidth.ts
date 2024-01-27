import { useState, useEffect } from "react";

export function useWindowWidth() {
	const isBrowser = typeof window !== "undefined";

	const [windowWidth, setWindowWidth] = useState(isBrowser ? window.innerWidth : 0);

	useEffect(() => {
		if (!isBrowser) {
			return;
		}

		function handleResize() {
			setWindowWidth(window.innerWidth);
		}

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [isBrowser]);

	return windowWidth;
}
