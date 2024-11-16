import { Column } from "react-table";
import { PetownerInfoCell } from "./PetownerInfoCell";
import { PetownerActionsCell } from "./PetownerActionsCell";
// import { PetownerSelectionCell } from "./PetownerSelectionCell";
import { PetownerCustomHeader } from "./PetownerCustomHeader";
// import { PetownerSelectionHeader } from "./PetownerSelectionHeader";
import { User } from "../../core/_models";
import { PetownerAddress } from "./PetownerAddress";
import { PetownerPhoneNumber } from "./PetownerPhoneNumber";

const petownersColumns: ReadonlyArray<Column<User>> = [
	// {
	// 	Header: (props) => <PetownerSelectionHeader tableProps={props} />,
	// 	id: "selection",
	// 	Cell: ({ ...props }) => (
	// 		<PetownerSelectionCell id={props.data[props.row.index].id} />
	// 	),
	// },
	{
		Header: (props) => (
			<PetownerCustomHeader
				tableProps={props}
				title="Name"
				className="min-w-125px"
			/>
		),
		id: "name",
		Cell: ({ ...props }) => (
			<PetownerInfoCell user={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<PetownerCustomHeader
				tableProps={props}
				title="Phone Number"
				className="min-w-125px"
			/>
		),
		id: "phone_number",
		Cell: ({ ...props }) => (
			<PetownerPhoneNumber
				phone_number={props.data[props.row.index].phone_number}
			/>
		),
	},
	{
		Header: (props) => (
			<PetownerCustomHeader
				tableProps={props}
				title="Address"
				className="min-w-125px"
			/>
		),
		id: "address",
		Cell: ({ ...props }) => (
			<PetownerAddress petowner={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<PetownerCustomHeader
				tableProps={props}
				title="Actions"
				className="text-end min-w-100px"
			/>
		),
		id: "actions",
		Cell: ({ ...props }) => (
			<PetownerActionsCell id={props.data[props.row.index].id} />
		),
	},
];

export { petownersColumns };
