import { Column } from "react-table";
import { MedicationsNameInfoCell } from "./MedicationsNameInfoCell";
import { MedicationsNameActionsCell } from "./MedicationsNameActionsCell";
// import { MedicationsNameSelectionCell } from "./MedicationsNameSelectionCell";
import { MedicationsNameCustomHeader } from "./MedicationsNameCustomHeader";
// import { MedicationsNameSelectionHeader } from "./MedicationsNameSelectionHeader";
import { MNames } from "../../core/_models";
import { MedicationsNameStatus } from "./MedicationsNameStatus";

const eventsColumns: ReadonlyArray<Column<MNames>> = [
	// {
	// 	Header: (props) => (
	// 		<MedicationsNameSelectionHeader tableProps={props} />
	// 	),
	// 	id: "selection",
	// 	Cell: ({ ...props }) => (
	// 		<MedicationsNameSelectionCell id={props.data[props.row.index].id} />
	// 	),
	// },
	{
		Header: (props) => (
			<MedicationsNameCustomHeader
				tableProps={props}
				title="Name"
				className="min-w-125px"
			/>
		),
		id: "name",
		Cell: ({ ...props }) => (
			<MedicationsNameInfoCell mnames={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<MedicationsNameCustomHeader
				tableProps={props}
				title="Status"
				className="min-w-125px"
			/>
		),
		id: "status",
		Cell: ({ ...props }) => (
			<MedicationsNameStatus
				status={props.data[props.row.index].status}
			/>
		),
	},
	{
		Header: (props) => (
			<MedicationsNameCustomHeader
				tableProps={props}
				title="Actions"
				className="text-end min-w-100px"
			/>
		),
		id: "actions",
		Cell: ({ ...props }) => (
			<MedicationsNameActionsCell
				id={props.data[props.row.index].id}
				mnames={props.data[props.row.index]}
			/>
		),
	},
];

export { eventsColumns };
