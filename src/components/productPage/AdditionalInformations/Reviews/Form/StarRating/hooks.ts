import { useCallback } from "react";

import type { StarRatingProps } from "./types";

export function useStarRating(handleClickCallback: StarRatingProps["handleClickCallback"]) {
	const handleClick = useCallback(
		(event: any) => {
			handleClickCallback(event);
		},
		[handleClickCallback],
	);

	return { handleClick };
}
