import { useState, useEffect, useRef } from "react";

export const useToggleNavigation = (isDesktop: boolean) => {
	const [activeNavItemIndex, setActiveNavIndex] = useState(isDesktop);

	const handleActiveNavItem = () => {
		setActiveNavIndex((prevState) => !prevState);
	};

	return { activeNavItemIndex, handleActiveNavItem };
};

export const useMaxHeight = <T extends HTMLElement>(isExpanded: boolean) => {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		if (!ref.current) return;

		const { scrollHeight } = ref.current;

		if (isExpanded) {
			ref.current.style.maxHeight = `${scrollHeight}px`;
		} else {
			ref.current.style.maxHeight = `0px`;
		}
	}, [isExpanded]);

	return { ref };
};
