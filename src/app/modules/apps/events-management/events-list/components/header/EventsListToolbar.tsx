import { useMemo } from "react";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponseData } from "../../core/QueryResponseProvider";
import { EventsListFilter } from "./EventsListFilter";
import { exportToExcel, exportToPDF } from "../../core/_requests";
// import { exportToExcel } from "../../core/_requests";

const EventsListToolbar = () => {
	const { setItemIdForUpdate } = useListView();
	const openAddUserModal = () => {
		setItemIdForUpdate(null);
	};
	const users = useQueryResponseData();
	const data = useMemo(() => users, [users]);

	return (
		<div
			className="d-flex justify-content-end"
			data-kt-user-table-toolbar="base"
		>
			<EventsListFilter />

			{/* begin::Export */}
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
						exportToPDF(data);
					}
				}}
			>
				<KTIcon iconName="some-files" className="fs-2" />
				Export to PDF
			</button>
			{/* end::Export */}

			{/* begin::Add user */}
			<button
				type="button"
				className="btn btn-primary"
				onClick={openAddUserModal}
			>
				<KTIcon iconName="plus" className="fs-2" />
				Add new Event
			</button>
			{/* end::Add user */}
		</div>
	);
};

export { EventsListToolbar };
