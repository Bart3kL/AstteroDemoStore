import { useState } from "react";

export type SubItemsProps = {
	title: string;
	href: string;
};

export const useSubjectsMenu = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [selectedSubLinks, setSelectedSubLinks] = useState<SubItemsProps[]>([]);

	const handleMouseLeave = () => {
		setIsModalOpen(false);
	};

	const handleOpenModal = (items: SubItemsProps[]) => {
		setIsModalOpen(true);
		setSelectedSubLinks(items);
	};

	return {
		handleOpenModal,
		handleMouseLeave,
		isModalOpen,
		selectedSubLinks,
	};
};
