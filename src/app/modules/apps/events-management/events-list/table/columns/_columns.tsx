import { Column } from "react-table";
import { EventInfoCell } from "./EventInfoCell";
import { EventActionsCell } from "./EventActionsCell";
// import { EventSelectionCell } from "./EventSelectionCell";
import { EventCustomHeader } from "./EventCustomHeader";
// import { EventSelectionHeader } from "./EventSelectionHeader";
import { Event } from "../../core/_models";
import { EventDT } from "./EventDT";
import { EventDTStatus } from "./EventDTStatus";

const eventsColumns: ReadonlyArray<Column<Event>> = [
	// {
	// 	Header: (props) => <EventSelectionHeader tableProps={props} />,
	// 	id: "selection",
	// 	Cell: ({ ...props }) => (
	// 		<EventSelectionCell id={props.data[props.row.index].id} />
	// 	),
	// },
	{
		Header: (props) => (
			<EventCustomHeader
				tableProps={props}
				title="Name"
				className="min-w-125px"
			/>
		),
		id: "name",
		Cell: ({ ...props }) => (
			<EventInfoCell event={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<EventCustomHeader
				tableProps={props}
				title="Date & Time"
				className="min-w-125px"
			/>
		),
		id: "event",
		Cell: ({ ...props }) => <EventDT event={props.data[props.row.index]} />,
	},
	{
		Header: (props) => (
			<EventCustomHeader
				tableProps={props}
				title="Date & Time"
				className="min-w-125px"
			/>
		),
		id: "eventstatus",
		Cell: ({ ...props }) => (
			<EventDTStatus event={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<EventCustomHeader
				tableProps={props}
				title="Actions"
				className="text-end min-w-100px"
			/>
		),
		id: "actions",
		Cell: ({ ...props }) => (
			<EventActionsCell id={props.data[props.row.index].id} />
		),
	},
];

export { eventsColumns };
