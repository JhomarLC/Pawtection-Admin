import { FC } from "react";
import { Event } from "../../core/_models";

type Props = {
	event: Event;
};

const EventDTStatus: FC<Props> = ({ event }) => {
	// Check if date_time is defined and create a Date object
	const eventDateTime = event.date_time ? new Date(event.date_time) : null;
	const currentDateTime = new Date();

	// Determine the event status (upcoming or done)
	const status =
		eventDateTime && eventDateTime.getTime() > currentDateTime.getTime()
			? "Upcoming"
			: "Done";

	// Assign badge class based on the status
	const badgeClass =
		status === "Upcoming"
			? "badge badge-success fw-bolder"
			: "badge badge-danger fw-bolder";

	return (
		<div className="d-flex align-items-center">
			<span className={badgeClass}>{status}</span>
		</div>
	);
};

export { EventDTStatus };
