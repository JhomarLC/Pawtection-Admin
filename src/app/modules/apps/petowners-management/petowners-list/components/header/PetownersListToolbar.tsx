import { PetownersListFilter } from "./PetownersListFilter";
import { exportToExcel, exportToPDF } from "../../core/_requests";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { useQueryResponseData } from "../../core/QueryResponseProvider";
import { useMemo } from "react";

const PetownersListToolbar = () => {
	const users = useQueryResponseData();
	const data = useMemo(() => users, [users]);

	return (
		<div
			className="d-flex justify-content-end"
			data-kt-user-table-toolbar="base"
		>
			<PetownersListFilter />
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
		</div>
	);
};

export { PetownersListToolbar };
