export const calculateTimeAgo = (dateString: string) => {
	const date = new Date(dateString);
	const now = new Date();
	const timeDifference = now.getTime() - date.getTime();

	const millisecondsPerSecond = 1000;
	const millisecondsPerMinute = 60 * millisecondsPerSecond;
	const millisecondsPerHour = 60 * millisecondsPerMinute;
	const millisecondsPerDay = 24 * millisecondsPerHour;
	const millisecondsPerWeek = 7 * millisecondsPerDay;
	const millisecondsPerMonth = 30 * millisecondsPerDay;
	const millisecondsPerYear = 365 * millisecondsPerDay;

	let timeAgo;

	switch (true) {
		case timeDifference < millisecondsPerMinute:
			const secondsAgo = Math.floor(timeDifference / millisecondsPerSecond);
			timeAgo = `${secondsAgo} second${secondsAgo !== 1 ? "s" : ""} ago`;
			break;
		case timeDifference < millisecondsPerHour:
			const minutesAgo = Math.floor(timeDifference / millisecondsPerMinute);
			timeAgo = `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
			break;
		case timeDifference < millisecondsPerDay:
			const hoursAgo = Math.floor(timeDifference / millisecondsPerHour);
			timeAgo = `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
			break;
		case timeDifference < millisecondsPerWeek:
			const daysAgo = Math.floor(timeDifference / millisecondsPerDay);
			timeAgo = `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
			break;
		case timeDifference < millisecondsPerMonth:
			const weeksAgo = Math.floor(timeDifference / millisecondsPerWeek);
			timeAgo = `${weeksAgo} week${weeksAgo !== 1 ? "s" : ""} ago`;
			break;
		case timeDifference < millisecondsPerYear:
			const monthsAgo = Math.floor(timeDifference / millisecondsPerMonth);
			timeAgo = `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`;
			break;
		default:
			const yearsAgo = Math.floor(timeDifference / millisecondsPerYear);
			timeAgo = `${yearsAgo} year${yearsAgo !== 1 ? "s" : ""} ago`;
	}

	return timeAgo;
};
