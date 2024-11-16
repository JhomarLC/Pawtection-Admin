import { Column } from "react-table";
import { MedicationsTypeInfoCell } from "./MedicationsTypeInfoCell";
import { MedicationsTypeActionsCell } from "./MedicationsTypeActionsCell";
// import { MedicationsTypeSelectionCell } from "./MedicationsTypeSelectionCell";
import { MedicationsTypeCustomHeader } from "./MedicationsTypeCustomHeader";
// import { MedicationsTypeSelectionHeader } from "./MedicationsTypeSelectionHeader";
import { MType } from "../../core/_models";
import { MedicationsTypeStatus } from "./MedicationsTypeStatus";

const eventsColumns: ReadonlyArray<Column<MType>> = [
	// {
	// 	Header: (props) => (
	// 		<MedicationsTypeSelectionHeader tableProps={props} />
	// 	),
	// 	id: "selection",
	// 	Cell: ({ ...props }) => (
	// 		<MedicationsTypeSelectionCell id={props.data[props.row.index].id} />
	// 	),
	// },
	{
		Header: (props) => (
			<MedicationsTypeCustomHeader
				tableProps={props}
				title="Name"
				className="min-w-125px"
			/>
		),
		id: "name",
		Cell: ({ ...props }) => (
			<MedicationsTypeInfoCell mtype={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<MedicationsTypeCustomHeader
				tableProps={props}
				title="Status"
				className="min-w-125px"
			/>
		),
		id: "status",
		Cell: ({ ...props }) => (
			<MedicationsTypeStatus
				status={props.data[props.row.index].status}
			/>
		),
	},
	{
		Header: (props) => (
			<MedicationsTypeCustomHeader
				tableProps={props}
				title="Actions"
				className="text-end min-w-100px"
			/>
		),
		id: "actions",
		Cell: ({ ...props }) => (
			<MedicationsTypeActionsCell id={props.data[props.row.index].id} />
		),
	},
];

export { eventsColumns };
