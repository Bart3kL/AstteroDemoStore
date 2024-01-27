import { useCallback } from "react";

import type { PhotosInputProps } from "./types";

export function usePhotosInput(onChangeCallback: PhotosInputProps["onChangeCallback"]) {
	const handleChange = useCallback(
		(event: any) => {
			onChangeCallback(event);
		},
		[onChangeCallback],
	);

	return { handleChange };
}
