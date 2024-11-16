import { FC } from "react";
import { Event } from "../../core/_models";

type Props = {
	event: Event;
};

const EventDT: FC<Props> = ({ event }) => {
	// Check if date_time is defined before formatting
	const formattedDateTime = event.date_time
		? new Date(event.date_time).toLocaleString("en-PH", {
				month: "long", // Full month name (e.g., "October")
				day: "2-digit", // Day with leading zero (e.g., "04")
				year: "numeric", // Full year (e.g., "2024")
				hour: "2-digit", // Hour (12-hour format)
				minute: "2-digit", // Minute with leading zero (e.g., "08:00")
				hour12: true, // 12-hour format with AM/PM
		  })
		: "No date available"; // Fallback if date_time is undefined

	return (
		<div className="text-gray-800 text-hover-primary mb-1">
			{formattedDateTime}
		</div>
	);
};

export { EventDT };
