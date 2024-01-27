import { type ProductVariant } from "@/lib/shopify/functions/product/types";

export function getImagesByColor(products: ProductVariant[], color: string) {
	const filteredProducts = products.filter((product) => {
		const colorOption = product.selectedOptions.find(
			(option) => option.name === "Color" && option.value.toLowerCase() === color.toLowerCase(),
		);
		return colorOption;
	});

	if (filteredProducts.length === 0) {
		const allProductURLs = products.map((product) => product.image?.url);
		return [...new Set(allProductURLs)].filter((url) => url);
	}

	const productURLs = filteredProducts.map((product) => product.image?.url);

	return [...new Set(productURLs)].filter((url) => url);
}
