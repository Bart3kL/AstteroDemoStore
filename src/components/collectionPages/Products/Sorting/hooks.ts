import { useState, useCallback, useEffect, useRef } from "react";

export function useSorting() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = useCallback(() => setIsDropdownOpen((prevState) => !prevState), []);

	const sortAddRef = useRef<HTMLDivElement>(null);

	const isNode = (target: EventTarget | null): target is Node => {
		return target !== null && target instanceof Node;
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sortAddRef.current &&
				isNode(event.target) &&
				!sortAddRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside, { passive: true });

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return {
		toggleDropdown,
		isDropdownOpen,
		sortAddRef,
	};
}
