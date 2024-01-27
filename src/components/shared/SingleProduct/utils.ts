import type { ProductOption, ProductVariant } from "@/lib/shopify/functions/product/types";

export function prepareProductOptions(attributes: ProductOption[]) {
	return attributes.reduce(
		(result, attribute) => {
			if (["Color", "Size", "Material"].includes(attribute.name)) {
				result[attribute.name.toLowerCase()] = attribute.values;
			}
			return result;
		},
		{} as { [key: string]: string[] },
	);
}

export function getImagesByColor(products: ProductVariant[], color: string) {
	const filteredProducts = products.filter((product) => {
		const colorOption = product.selectedOptions.find(
			(option) => option.name === "Color" && option.value.toLowerCase() === color.toLowerCase(),
		);
		return colorOption;
	});

	if (filteredProducts.length === 0) {
		const allProductURLs = products.map((product) => product.imageSmall?.url);
		return [...new Set(allProductURLs)].filter((url) => url);
	}

	const productURLs = filteredProducts.map((product) => product.imageSmall?.url);

	return [...new Set(productURLs)].filter((url) => url);
}
