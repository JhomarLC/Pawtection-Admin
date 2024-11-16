import { useMemo } from "react";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { useQueryResponseData } from "../../core/QueryResponseProvider";
import { exportToExcel, exportToPDF } from "../../core/_requests";
// import {useListView} from '../../core/ListViewProvider'
// import {VeterinariansListFilter} from './VeterinariansListFilter'

const VeterinariansListToolbar = () => {
	// const {setItemIdForUpdate} = useListView()
	// // const openAddUserModal = () => {
	// //   setItemIdForUpdate(null)
	// // }
	const users = useQueryResponseData();
	const data = useMemo(() => users, [users]);

	return (
		<div
			className="d-flex justify-content-end"
			data-kt-user-table-toolbar="base"
		>
			{/* <VeterinariansListFilter /> */}

			{/* begin::Export */}
			<button
				type="button"
				className="btn btn-light-primary me-3"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
			>
				<KTIcon iconName="exit-up" className="fs-2" />
				Export
			</button>
			<div
				className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
				data-kt-menu="true"
			>
				<div
					className="menu-item px-3"
					onClick={() => exportToExcel(data)}
				>
					<a className="menu-link px-3 flex gap-3">
						<KTIcon iconName="notepad" className="fs-2" /> Excel
					</a>
				</div>
				<div
					className="menu-item px-3"
					onClick={() => exportToPDF(data)}
				>
					<a className="menu-link px-3 flex gap-3">
						<KTIcon iconName="some-files" className="fs-2" /> PDF
					</a>
				</div>
			</div>
			{/* end::Export */}

			{/* begin::Add user */}
			{/* <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
        <KTIcon iconName='plus' className='fs-2' />
        Add Veterinarians
      </button> */}
			{/* end::Add user */}
		</div>
	);
};

export { VeterinariansListToolbar };
