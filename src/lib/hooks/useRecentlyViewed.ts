export function useRecentlyViewedProducts(maxProducts = 10) {
	const cookieName = "recentlyViewedProducts";

	const getRecentlyViewedProducts = () => {
		const cookieValue = document.cookie
			.split("; ")
			.find((cookie) => cookie.startsWith(`${cookieName}=`));

		if (cookieValue) {
			return JSON.parse(cookieValue.split("=")[1]);
		} else {
			return [];
		}
	};

	const addProductToRecentlyViewed = (productId: string) => {
		let recentlyViewedProducts = getRecentlyViewedProducts();

		const productIndex = recentlyViewedProducts.indexOf(productId);

		if (productIndex !== -1) {
			recentlyViewedProducts.splice(productIndex, 1);
		}

		if (recentlyViewedProducts.length >= maxProducts) {
			recentlyViewedProducts.pop();
		}

		recentlyViewedProducts.unshift(productId);

		document.cookie = `${cookieName}=${JSON.stringify(recentlyViewedProducts)}`;
	};

	return {
		getRecentlyViewedProducts,
		addProductToRecentlyViewed,
	};
}
