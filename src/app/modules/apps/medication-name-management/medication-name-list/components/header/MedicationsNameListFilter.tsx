import { useEffect, useState } from "react";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import {
	initialQueryState,
	KTIcon,
} from "../../../../../../../_metronic/helpers";
import { useQueryRequest } from "../../core/QueryRequestProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";

const MedicationsNameListFilter = () => {
	const { updateState } = useQueryRequest();
	const { isLoading } = useQueryResponse();
	const [brgy, setBrgy] = useState<string | undefined>();

	useEffect(() => {
		MenuComponent.reinitialization();
	}, []);

	const resetData = () => {
		updateState({ filter: undefined, ...initialQueryState });
	};

	const filterData = () => {
		updateState({
			filter: brgy,
			...initialQueryState,
		});
	};

	return (
		<>
			{/* begin::Filter Button */}
			<button
				disabled={isLoading}
				type="button"
				className="btn btn-light-primary me-3"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
			>
				<KTIcon iconName="filter" className="fs-2" />
				Filter
			</button>
			{/* end::Filter Button */}
			{/* begin::SubMenu */}
			<div
				className="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
				data-kt-menu="true"
			>
				{/* begin::Header */}
				<div className="px-7 py-5">
					<div className="fs-5 text-gray-900 fw-bolder">
						Filter Options
					</div>
				</div>
				{/* end::Header */}

				{/* begin::Separator */}
				<div className="separator border-gray-200"></div>
				{/* end::Separator */}

				{/* begin::Content */}
				<div className="px-7 py-5" data-kt-user-table-filter="form">
					{/* begin::Input group */}
					<div className="mb-10">
						<label className="form-label fs-6 fw-bold">
							Barangay:
						</label>
						<select
							className="form-select form-select-solid fw-bolder"
							data-kt-select2="true"
							data-placeholder="Select option"
							data-allow-clear="true"
							data-kt-user-table-filter="brgy"
							data-hide-search="true"
							onChange={(e) => setBrgy(e.target.value)}
							value={brgy}
						>
							<option value=""></option>
							<option value="A. Pascual">A. Pascual</option>
							<option value="Abar Ist">Abar Ist</option>
							<option value="Abar 2nd">Abar 2nd</option>
							<option value="Bagong Sikat">Bagong Sikat</option>
							<option value="Caanawan">Caanawan</option>
							<option value="Calaocan">Calaocan</option>
							<option value="Camanacsacan">Camanacsacan</option>
							<option value="Culaylay">Culaylay</option>
							<option value="Dizol">Dizol</option>
							<option value="Kaliwanagan">Kaliwanagan</option>
							<option value="Kita-Kita">Kita-Kita</option>
							<option value="Malasin">Malasin</option>
							<option value="Manicla">Manicla</option>
							<option value="Palestina">Palestina</option>
							<option value="Parang Mangga">Parang Mangga</option>
							<option value="Villa Joson">Villa Joson</option>
							<option value="Pinili">Pinili</option>
							<option value="Rafael Rueda, Sr. Pob.">
								Rafael Rueda, Sr. Pob.
							</option>
							<option value="Ferdinand E. Marcos Pob.">
								Ferdinand E. Marcos Pob.
							</option>
							<option value="Canuto Ramos Pob.">
								Canuto Ramos Pob.
							</option>
							<option value="Raymundo Eugenio Pob.">
								Raymundo Eugenio Pob.
							</option>
							<option value="Crisanto Sanchez Pob.">
								Crisanto Sanchez Pob.
							</option>
							<option value="Porais">Porais</option>
							<option value="San Agustin">San Agustin</option>
							<option value="San Juan">San Juan</option>
							<option value="San Mauricio">San Mauricio</option>
							<option value="Santo Niño 1st">
								Santo Niño 1st
							</option>
							<option value="Santo Niño 2nd">
								Santo Niño 2nd
							</option>
							<option value="Santo Tomas">Santo Tomas</option>
							<option value="Sibut">Sibut</option>
							<option value="Sinipit Bubon">Sinipit Bubon</option>
							<option value="Santo Niño 3rd">
								Santo Niño 3rd
							</option>
							<option value="Tabulac">Tabulac</option>
							<option value="Tayabo">Tayabo</option>
							<option value="Tondod">Tondod</option>
							<option value="Tulat">Tulat</option>
							<option value="Villa Floresca">
								Villa Floresca
							</option>
							<option value="Villa Marina">Villa Marina</option>
						</select>
					</div>
					{/* end::Input group */}

					{/* begin::Actions */}
					<div className="d-flex justify-content-end">
						<button
							type="button"
							disabled={isLoading}
							onClick={resetData}
							className="btn btn-light btn-active-light-primary fw-bold me-2 px-6"
							data-kt-menu-dismiss="true"
							data-kt-user-table-filter="reset"
						>
							Reset
						</button>
						<button
							disabled={isLoading}
							type="button"
							onClick={filterData}
							className="btn btn-primary fw-bold px-6"
							data-kt-menu-dismiss="true"
							data-kt-user-table-filter="filter"
						>
							Apply
						</button>
					</div>
					{/* end::Actions */}
				</div>
				{/* end::Content */}
			</div>
			{/* end::SubMenu */}
		</>
	);
};

export { MedicationsNameListFilter };
