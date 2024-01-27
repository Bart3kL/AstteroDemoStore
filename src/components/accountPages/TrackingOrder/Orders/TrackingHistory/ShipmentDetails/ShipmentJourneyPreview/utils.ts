import { type ShipmentJourneyPreviewProps } from "./types";

export function segregateAndSortByDate(objects: ShipmentJourneyPreviewProps["events"]) {
	const sortedObjects: {
		[date: string]: ShipmentJourneyPreviewProps["events"];
	} = {};

	for (const obj of objects) {
		const dateTime = new Date(obj.date);
		const dateKey = dateTime.toISOString().split("T")[0];

		if (!sortedObjects[dateKey]) {
			sortedObjects[dateKey] = [];
		}

		sortedObjects[dateKey].push(obj);
	}

	const sortedDates = Object.keys(sortedObjects).sort((a, b) => a.localeCompare(b));

	const resultArray = sortedDates.map((date) => {
		const sortedObjectsByTime = sortedObjects[date].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
		return sortedObjectsByTime;
	});

	return resultArray.reverse();
}

export function formatDate(inputDate: string) {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const date = new Date(inputDate);
	const day = days[date.getUTCDay()];
	const month = months[date.getUTCMonth()];
	const dayOfMonth = date.getUTCDate();
	const year = date.getUTCFullYear();

	function getDaySuffix(day: number) {
		if (day >= 11 && day <= 13) {
			return "th";
		}
		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	}

	const daySuffix = getDaySuffix(dayOfMonth);

	const formattedDate = `${day} ${month} ${dayOfMonth}${daySuffix}, ${year}`;

	return formattedDate;
}
