import { useState, useEffect } from "react";
import { response } from "./mock";

export const useSearchInput = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [orderId, setOrderId] = useState<string>("55454");
	const [isError, setIsError] = useState(false);
	const [data, setData] = useState<any>({});
	const [isLoading, setIsLoading] = useState(false);
	const [shouldHandleSearch, setShouldHandleSearch] = useState(false);

	useEffect(() => {
		const searchOrderId = new URLSearchParams(window.location.search).get("searchOrderId");
		if (searchOrderId) {
			setOrderId(searchOrderId);
			setShouldHandleSearch(true);
		}
	}, []);

	useEffect(() => {
		if (shouldHandleSearch) {
			handleSubmit();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [shouldHandleSearch]);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleOrderId = (e: any) => {
		setOrderId((e.target as HTMLInputElement).value);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const isActive = orderId ? true : false || isFocused;

	const handleSubmit = async (e?: any) => {
		e?.preventDefault();
		setIsLoading(true);

		if (!/^\d+$/.test(orderId)) {
			setIsError(true);
			setIsLoading(false);
			return;
		}
		// const response = await (getLazyState as any)('wondermentOrderStatus', {
		//   variables: {
		//     query: orderId,
		//     authParams: {
		//       email: '',
		//     },
		//   },
		// });

		if (response && response.data && response.data.shipmentSearch === null) {
			setIsError(true);
			setIsLoading(false);
		} else {
			if (response.data.shipmentSearch.shipments[0].events.length === 0) {
				setIsError(true);
				setIsLoading(false);
				return;
			}

			setTimeout(() => {
				setData(response.data);
				setOrderIdParamInQueryString(orderId);
				setIsLoading(false);
				setIsError(false);
			}, 1000);
		}
	};

	return {
		isActive,
		handleFocus,
		orderId,
		handleOrderId,
		handleBlur,
		isError,
		handleSubmit,
		isLoading,
		data,
	};
};

export function setOrderIdParamInQueryString(orderId: string) {
	if (typeof window !== "undefined" && "URLSearchParams" in window) {
		var searchParams = new URLSearchParams(window.location.search);
		if (window.location.pathname.includes("tracking-order")) {
			searchParams.set("searchOrderId", orderId);
			history.pushState(null, "", `${window.location.pathname}?${searchParams.toString()}`);
		}
	}
}
