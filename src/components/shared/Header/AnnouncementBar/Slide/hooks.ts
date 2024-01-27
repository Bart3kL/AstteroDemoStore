import { useState } from "react";

export const useCopy = (code: string) => {
	const [isExploding, setIsExploding] = useState(false);
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(code);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCopyClick = () => {
		setIsExploding(true);
		copyToClipboard()
			.then(() => {})
			.catch((error) => {
				console.error(error);
			});

		setTimeout(() => {
			setIsExploding(false);
		}, 4000);
	};

	return {
		isExploding,
		handleCopyClick,
	};
};
