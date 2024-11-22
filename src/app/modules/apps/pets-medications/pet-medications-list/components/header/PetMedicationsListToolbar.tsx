import { useNavigate } from "react-router-dom";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { Button } from "react-bootstrap";
import { PetMedicationsListFilter } from "./PetMedicationsListFilter";
// import { useListView } from "../../core/ListViewProvider";
// import { PetListFilter } from "./PetListFilter";

const PetMedicationsListToolbar = () => {
	// const { setItemIdForUpdate } = useListView();
	// const openAddUserModal = () => {
	// 	setItemIdForUpdate(null);
	// };
	const navigate = useNavigate();

	return (
		<div
			className="d-flex justify-content-end"
			data-kt-user-table-toolbar="base"
		>
			<PetMedicationsListFilter />

			{/* begin::Export */}
			{/* <button type="button" className="btn btn-light-primary me-3">
				<KTIcon iconName="exit-up" className="fs-2" />
				Export
			</button> */}
			{/* end::Export */}

			{/* begin::Add user */}
			<Button
				onClick={() => {
					navigate(-2);
				}}
				type="button"
				className="btn btn-primary"
			>
				<KTIcon iconName="arrow-left" className="fs-2" />
				Back
			</Button>
			{/* end::Add user */}
		</div>
	);
};

export { PetMedicationsListToolbar };
