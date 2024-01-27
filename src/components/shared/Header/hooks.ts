import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import throttle from "lodash.throttle";

export const useMenu = () => {
	const [jsEnabled, setJsEnabled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [scrollY, setScrollY] = useState(0);
	const [changeHeaderBackground, setChangeHeaderBackground] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		setJsEnabled(true);
	}, []);

	useEffect(() => {
		if (
			jsEnabled &&
			typeof window !== "undefined" &&
			typeof document !== "undefined" &&
			!pathname.includes("products")
		) {
			const handleScroll = throttle(() => {
				setChangeHeaderBackground(window.scrollY >= 150);

				if (window.innerWidth >= 1024) return;
				if (window.scrollY < 150) return;

				const isScrollingDown = scrollY < window.scrollY;
				setIsHidden(isScrollingDown);
				setScrollY(window.scrollY);
			}, 200);

			setChangeHeaderBackground(window.scrollY >= 150);

			window.addEventListener("scroll", handleScroll);

			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		}
	}, [jsEnabled, pathname, scrollY]);

	return {
		changeHeaderBackground,
		isHidden,
	};
};
