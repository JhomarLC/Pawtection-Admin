import { Column } from "react-table";
import { VeterinariansInfoCell } from "./VeterinariansInfoCell";
// import {VeterinariansTwoStepsCell} from './VeterinariansTwoStepsCell'
// import {VeterinariansActionsCell} from './VeterinariansActionsCell'
import { VeterinariansCustomHeader } from "./VeterinariansCustomHeader";
import { User } from "../../core/_models";
import { VeterinariansLicenseNumber } from "./VeterinariansLicenseNumber";
import { VeterinariansPosition } from "./VeterinariansPosition";
import { VeterinariansStatus } from "./VeterinariansStatus";
import { VeterinariansActionsCell } from "./VeterinariansActionsCell";
import { VeterinariansPhoneNumber } from "./VeterinariansPhoneNumber";
import { VeterinariansAddress } from "./VeterinariansAddress";

const veterinariansColumns: ReadonlyArray<Column<User>> = [
	{
		Header: (props) => (
			<VeterinariansCustomHeader
				tableProps={props}
				title="Name"
				className="min-w-125px"
			/>
		),
		id: "name",
		Cell: ({ ...props }) => (
			<VeterinariansInfoCell user={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<VeterinariansCustomHeader
				tableProps={props}
				title="Position"
				className="min-w-125px"
			/>
		),
		id: "position",
		Cell: ({ ...props }) => (
			<VeterinariansPosition
				position={props.data[props.row.index].position}
			/>
		),
	},
	{
		Header: (props) => (
			<VeterinariansCustomHeader
				tableProps={props}
				title="License Number"
				className="min-w-125px"
			/>
		),
		id: "license_number",
		Cell: ({ ...props }) => (
			<VeterinariansLicenseNumber
				license_number={props.data[props.row.index].license_number}
			/>
		),
	},
	{
		Header: (props) => (
			<VeterinariansCustomHeader
				tableProps={props}
				title="Phone No."
				className="min-w-125px"
			/>
		),
		id: "phone_number",
		Cell: ({ ...props }) => (
			<VeterinariansPhoneNumber
				phone_number={props.data[props.row.index].phone_number}
			/>
		),
	},
	{
		Header: (props) => (
			<VeterinariansCustomHeader
				tableProps={props}
				title="Address"
				className="min-w-125px"
			/>
		),
		id: "address",
		Cell: ({ ...props }) => (
			<VeterinariansAddress user={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<VeterinariansCustomHeader
				tableProps={props}
				title="Status"
				className="min-w-125px"
			/>
		),
		id: "status",
		Cell: ({ ...props }) => (
			<VeterinariansStatus status={props.data[props.row.index].status} />
		),
	},

	{
		Header: (props) => (
			<VeterinariansCustomHeader
				tableProps={props}
				title="Actions"
				className="text-end min-w-100px"
			/>
		),
		id: "actions",
		Cell: ({ ...props }) => (
			<VeterinariansActionsCell
				id={props.data[props.row.index].id}
				status={props.data[props.row.index].status}
			/>
		),
	},
];

export { veterinariansColumns };
