import type { ReadonlyURLSearchParams } from "next/navigation";
import { Howl } from "howler";

import type { Product } from "./shopify/functions/product/types";

type Cx = (...args: Array<string | boolean | null | undefined>) => string;
export const cx: Cx = (...args) => {
	return args
		.flat()
		.filter(
			(x: string | boolean | null | undefined) =>
				x !== null && x !== undefined && typeof x !== "boolean",
		)
		.join(" ");
};

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
	const paramsString = params.toString();
	const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

	return `${pathname}${queryString}`;
};

export const changeToFastImage = (src: string = "", width = 0, height = 0) => {
	const SHOPIFY_PREFIX = "https://cdn.shopify.com/s/files/1/0830/0819/2813/";

	let newUrl = src;

	if (src.includes(SHOPIFY_PREFIX)) {
		newUrl = `${src}&width=${width}&height=${height}`;
	}

	return newUrl;
};

type Audios = Record<string, string>;
type Sounds<T extends Audios> = { [K in keyof T]: Howl };

export const useSound = <T extends Audios>(audios: T): Sounds<T> => {
	const sounds = Object.entries(audios).reduce((acc, [key, value]) => {
		return {
			...acc,
			[key]: new Howl({ src: [value] }),
		};
	}, {} as Sounds<T>);
	return sounds;
};

export function debounce(func: any, wait = 500) {
	let timeoutId: ReturnType<typeof setTimeout> | undefined;
	return function debouncedFunc() {
		if (timeoutId !== undefined) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => func(), wait);
	};
}

export function getNumberAfterLastSlash(inputString: string) {
	const parts = inputString.split("/");
	const lastPart = parts[parts.length - 1];

	return lastPart;
}

export function countBrands(products: Product[]) {
	const brandCount = products.reduce<Record<string, number>>((accumulator, product) => {
		const brand = product.brand.value;
		accumulator[brand] = (accumulator[brand] || 0) + 1;
		return accumulator;
	}, {});

	const result = Object.keys(brandCount).map((brand) => ({
		title: brand,
		amount: brandCount[brand],
	}));

	return result;
}

export function prepareFiltersUrlParamsToObject(inputObject: any) {
	const processedObject = { ...inputObject };

	const propertiesToSplit = ["colors", "sizes", "materials", "brands", "ratings"];

	propertiesToSplit.forEach((property) => {
		if (processedObject[property]) {
			processedObject[property] = processedObject[property].split(",");
			if (property === "ratings") {
				processedObject[property] = processedObject[property].map(Number);
			}
		}
	});

	const numericProperties = ["minPrice", "maxPrice"];

	numericProperties.forEach((property) => {
		if (processedObject[property]) {
			processedObject[property] = Number(processedObject[property]);
		}
	});

	return processedObject;
}

export function setVariantParamInQueryString(variantId: string) {
	// synchronize newly selected variant with query params
	if (typeof window !== "undefined" && "URLSearchParams" in window) {
		var searchParams = new URLSearchParams(window.location.search);
		// TODO: make this the proper variant ID for the URL
		if (window.location.pathname.includes("products")) {
			searchParams.set("variant", variantId);
			history.pushState(null, "", `${window.location.pathname}?${searchParams.toString()}`);
		}
	}
}

export function checkIfProductHasBundle(idToFind: string, data: any) {
	const foundBundle = data.bundles.find(
		(bundle: any) => bundle.products.includes(idToFind) || bundle.freeProduct === idToFind,
	);

	return foundBundle;
}

export function objectToArray(productPages: any) {
	const result = [];

	for (const key in productPages) {
		if (productPages.hasOwnProperty(key)) {
			const productObject = {
				...productPages[key],
			};
			result.push(productObject);
		}
	}

	return result;
}
