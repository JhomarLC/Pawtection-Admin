import { Column } from "react-table";
// import { PetMedicationsActionsCell } from "./PetMedicationsActionsCell";
// import { PetSelectionCell } from "./PetSelectionCell";
// import { PetSelectionHeader } from "./PetSelectionHeader";

import { PetMed } from "../../core/_models";

import { PetMedicationsCustomHeader } from "./PetMedicationsCustomHeader";
import { PetMedicationsInfoCell } from "./PetMedicationsInfoCell";
// import { PetMedicationsActionsCell } from "./PetMedicationsActionsCell";
import { PetMedFee } from "./PetMedFee";
import { PetMedRemarks } from "./PetMedRemarks";
import { PetMedVet } from "./PetMedVet";
import { PetMedType } from "./PetMedType";
import { PetMedExpDate } from "./PetMedExpDate";
import { PetMedNextDate } from "./PetMedNextDate";
import { PetMedicationsOrBatch } from "./PetMedicationsOrBatch";
// import { PetAddress } from "./PetAddress";
// import { PetPhoneNumber } from "./PetPhoneNumber";

const petMedicationsColumns: ReadonlyArray<Column<PetMed>> = [
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="Type"
				className="min-w-100px"
			/>
		),
		id: "medtype",
		Cell: ({ ...props }) => (
			<PetMedType
				medtype={
					props.data[props.row.index].medicationname
						?.medication_type_id
				}
			/>
		),
	},
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="Name"
				className="min-w-125px"
			/>
		),
		id: "name",
		Cell: ({ ...props }) => (
			<PetMedicationsInfoCell petmed={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="OR/BATCH #"
				className="min-w-125px"
			/>
		),
		id: "or_batch",
		Cell: ({ ...props }) => (
			<PetMedicationsOrBatch petmed={props.data[props.row.index]} />
		),
	},
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="Veterinarian"
				className="min-w-125px"
			/>
		),
		id: "veterinarian",
		Cell: ({ ...props }) => (
			<PetMedVet name={props.data[props.row.index].veterinarian?.name} />
		),
	},
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="Expiry"
				className="min-w-125px"
			/>
		),
		id: "exp_date",
		Cell: ({ ...props }) => (
			<PetMedExpDate exp_date={props.data[props.row.index].expiry_date} />
		),
	},
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="Next Vaccination"
				className="min-w-125px"
			/>
		),
		id: "next_vacc",
		Cell: ({ ...props }) => (
			<PetMedNextDate
				next_vacc={props.data[props.row.index].next_vaccination}
			/>
		),
	},
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="Fee"
				className="min-w-100px"
			/>
		),
		id: "fee",
		Cell: ({ ...props }) => (
			<PetMedFee fee={props.data[props.row.index].fee} />
		),
	},
	{
		Header: (props) => (
			<PetMedicationsCustomHeader
				tableProps={props}
				title="Remarks"
				className="min-w-1005px"
			/>
		),
		id: "remarks",
		Cell: ({ ...props }) => (
			<PetMedRemarks remarks={props.data[props.row.index].remarks} />
		),
	},
];

export { petMedicationsColumns };
