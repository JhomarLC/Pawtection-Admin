import { KTIcon } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { EventsListFilter } from "./EventsListFilter";

const EventsListToolbar = () => {
	const { setItemIdForUpdate } = useListView();
	const openAddUserModal = () => {
		setItemIdForUpdate(null);
	};

	return (
		<div
			className="d-flex justify-content-end"
			data-kt-user-table-toolbar="base"
		>
			<EventsListFilter />

			{/* begin::Export */}
			{/* <button type="button" className="btn btn-light-primary me-3">
				<KTIcon iconName="exit-up" className="fs-2" />
				Export
			</button> */}
			{/* end::Export */}

			{/* begin::Add user */}
			<button
				type="button"
				className="btn btn-primary"
				onClick={openAddUserModal}
			>
				<KTIcon iconName="plus" className="fs-2" />
				Add Medications Type
			</button>
			{/* end::Add user */}
		</div>
	);
};

export { EventsListToolbar };
