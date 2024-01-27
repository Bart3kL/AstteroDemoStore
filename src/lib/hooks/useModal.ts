import { useState, useEffect, useRef } from "react";

export const useModal = () => {
	const [isActive, setIsActive] = useState(false);
	const [type, setType] = useState("");

	const handleClose = () => {
		setType("");
		setIsActive(false);
	};
	const handleOpen = (type: string) => {
		setType(type);
		setIsActive(true);
	};

	const isNode = (target: EventTarget | null): target is Node => {
		return target !== null && target instanceof Node;
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalAddRef.current &&
				isNode(event.target) &&
				!modalAddRef.current.contains(event.target as Node)
			) {
				setIsActive(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside, { passive: true });

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const modalAddRef = useRef<HTMLDivElement>(null);

	return {
		isActive: isActive && type,
		handleClose,
		handleOpen,
		modalAddRef,
		type,
	};
};
