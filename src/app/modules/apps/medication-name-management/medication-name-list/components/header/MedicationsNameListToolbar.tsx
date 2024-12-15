import { useMemo } from "react";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponseData } from "../../core/QueryResponseProvider";
import { MedicationsNameListFilter } from "./MedicationsNameListFilter";
import { exportToExcel, exportToPDF } from "../../core/_requests";
import { useAuth } from "../../../../../auth";

const MedicationsNameListToolbar = () => {
	const { setItemIdForUpdate } = useListView();
	const openAddUserModal = () => {
		setItemIdForUpdate(null);
	};
	const users = useQueryResponseData();
	const data = useMemo(() => users, [users]);

	console.log(users, data);

	const { currentUser } = useAuth();

	return (
		<div
			className="d-flex justify-content-end"
			data-kt-user-table-toolbar="base"
		>
			<MedicationsNameListFilter />
			<button
				type="button"
				className="btn btn-light-success me-3"
				onClick={() => {
					if (
						window.confirm(
							"Are you sure you want to export the data to Excel?"
						)
					) {
						exportToExcel(data);
					}
				}}
			>
				<KTIcon iconName="notepad" className="fs-2" />
				Export to Excel
			</button>
			<button
				type="button"
				className="btn btn-light-danger me-3"
				onClick={() => {
					if (
						window.confirm(
							"Are you sure you want to export the data to PDF?"
						)
					) {
						exportToPDF(data, currentUser?.user.name);
					}
				}}
			>
				<KTIcon iconName="some-files" className="fs-2" />
				Export to PDF
			</button>
			{/* begin::Add user */}
			<button
				type="button"
				className="btn btn-primary"
				onClick={openAddUserModal}
			>
				<KTIcon iconName="plus" className="fs-2" />
				Add Medications Name
			</button>

			{/* end::Add user */}
		</div>
	);
};

export { MedicationsNameListToolbar };
