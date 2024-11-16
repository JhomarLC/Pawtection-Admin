import { Column } from "react-table";
import { PetInfoCell } from "./PetInfoCell";
import { PetActionsCell } from "./PetActionsCell";
// import { PetSelectionCell } from "./PetSelectionCell";
import { PetCustomHeader } from "./PetCustomHeader";
// import { PetSelectionHeader } from "./PetSelectionHeader";
import { Pet } from "../../core/_models";
import { PetBreed } from "./PetBreed";
import { PetDOB } from "./PetDOB";
import { PetStatus } from "./PetStatus";
// import { PetAddress } from "./PetAddress";
// import { PetPhoneNumber } from "./PetPhoneNumber";

const petownersColumns: ReadonlyArray<Column<Pet>> = [
	// {
	// 	Header: (props) => <PetSelectionHeader tableProps={props} />,
	// 	id: "selection",
	// 	Cell: ({ ...props }) => (
	// 		<PetSelectionCell id={props.data[props.row.index].id} />
	// 	),
	// },

	{
		Header: (props) => (
			<PetCustomHeader
				tableProps={props}
				title="Name"
				className="min-w-125px"
			/>
		),
		id: "name",
		Cell: ({ ...props }) => (
			<PetInfoCell pet={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<PetCustomHeader
				tableProps={props}
				title="Breed"
				className="min-w-125px"
			/>
		),
		id: "breed",
		Cell: ({ ...props }) => (
			<PetBreed breed={props.data[props.row.index].breed} />
		),
	},
	{
		Header: (props) => (
			<PetCustomHeader
				tableProps={props}
				title="Date of Birth"
				className="min-w-125px"
			/>
		),
		id: "dob",
		Cell: ({ ...props }) => (
			<PetDOB dob={props.data[props.row.index].date_of_birth} />
		),
	},
	{
		Header: (props) => (
			<PetCustomHeader
				tableProps={props}
				title="Status"
				className="min-w-125px"
			/>
		),
		id: "status",
		Cell: ({ ...props }) => (
			<PetStatus petstatus={props.data[props.row.index].status} />
		),
	},
	// {
	// 	Header: (props) => (
	// 		<PetCustomHeader
	// 			tableProps={props}
	// 			title="Address"
	// 			className="min-w-125px"
	// 		/>
	// 	),
	// 	id: "address",
	// 	Cell: ({ ...props }) => (
	// 		<PetAddress petowner={props.data[props.row.index]} />
	// 	),
	// },
	{
		Header: (props) => (
			<PetCustomHeader
				tableProps={props}
				title="Actions"
				className="text-end min-w-100px"
			/>
		),
		id: "actions",
		Cell: ({ ...props }) => (
			<PetActionsCell id={props.data[props.row.index].id} />
		),
	},
];

export { petownersColumns };
