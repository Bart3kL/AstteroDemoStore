export const useManageAnimation = () => {
	const expiresDate = new Date();
	expiresDate.setFullYear(expiresDate.getFullYear() + 1);
	const allowAnimation = () => {
		document.cookie = `disallowWishlistAnimation=false; expires=${expiresDate.toUTCString()}`;
	};

	const disallowAnimation = () => {
		document.cookie = `disallowWishlistAnimation=true; expires=${expiresDate.toUTCString()}`;
	};

	const showWishlistAnimation =
		typeof window !== "undefined" &&
		typeof document !== "undefined" &&
		document.cookie.includes("disallowWishlistAnimation=false");

	return {
		allowAnimation,
		disallowAnimation,
		showWishlistAnimation,
	};
};
