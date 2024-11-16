import { FC } from "react";
import { Event } from "../../core/_models";

type Props = {
	event: Event;
};

// const PETOWNER_PROFILE_PATH =
// 	"http://127.0.0.1:8000/storage/petowners_profile/";

const EventInfoCell: FC<Props> = ({ event }) => (
	<div className="d-flex align-items-center">
		{/* begin:: Avatar */}
		<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
			<a href="#">
				{/* {event?.image && (
					<div className="symbol-label">
						<img
							src={PETOWNER_PROFILE_PATH + event?.image}
							alt={event.name}
							className="w-100"
						/>
					</div>
				)} */}
			</a>
		</div>
		<div className="d-flex flex-column">
			<a href="#" className="text-gray-800 text-hover-primary mb-1">
				{event.name}
			</a>
			<span>{event.place}</span>
		</div>
	</div>
);

export { EventInfoCell };
