import { useEffect, useState } from "react";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import {
	initialQueryState,
	KTIcon,
} from "../../../../../../../_metronic/helpers";
import { useQueryRequest } from "../../core/QueryRequestProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import axios, { AxiosResponse } from "axios";

// Define the type for each veterinarian
interface Veterinarian {
	id: string;
	name: string;
	email: string;
	image: string;
	email_verified_at: string | null;
	position: string;
	license_number: string;
	phone_number: string;
	status: string;
	created_at: string;
	updated_at: string;
}

// Define the response type
interface VeterinariansResponse {
	data: Veterinarian[];
	filtered_count: number;
}

const PetMedicationsListFilter = () => {
	const { updateState } = useQueryRequest();
	const { isLoading } = useQueryResponse();
	const [remarks, setRemarks] = useState<string | undefined>();
	const [vet, setVet] = useState<string | undefined>();
	const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);

	useEffect(() => {
		const fetchVets = async () => {
			const response: AxiosResponse<VeterinariansResponse> =
				await axios.get(
					`${import.meta.env.VITE_APP_API_URL}/veterinarians`
				);

			console.log(response.data.data);

			setVeterinarians(response.data.data);
		};

		MenuComponent.reinitialization();
		fetchVets();
	}, []);

	const resetData = () => {
		updateState({ search: undefined, ...initialQueryState });
	};

	const filterData = () => {
		updateState({
			search: remarks || vet,
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
							Veterinarians:
						</label>
						<select
							className="form-select form-select-solid fw-bolder"
							data-kt-select2="true"
							data-placeholder="Select option"
							data-allow-clear="true"
							data-kt-user-table-filter="brgy"
							data-hide-search="true"
							onChange={(e) => setVet(e.target.value)}
							value={vet}
						>
							<option value="">All Veterinarians</option>
							{veterinarians.map((vet) => (
								<option key={vet.id} value={vet.name}>
									{vet.name}
								</option>
							))}
						</select>
					</div>
					{/* end::Input group */}
					{/* begin::Input group */}
					<div className="mb-10">
						<label className="form-label fs-6 fw-bold">
							Remarks:
						</label>
						<select
							className="form-select form-select-solid fw-bolder"
							data-kt-select2="true"
							data-placeholder="Select option"
							data-allow-clear="true"
							data-kt-user-table-filter="brgy"
							data-hide-search="true"
							onChange={(e) => setRemarks(e.target.value)}
							value={remarks}
						>
							<option value="">All Pet Medications</option>
							<option value="Mass">Mass</option>
							<option value="Walk-In">Walk-In</option>
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

export { PetMedicationsListFilter };
