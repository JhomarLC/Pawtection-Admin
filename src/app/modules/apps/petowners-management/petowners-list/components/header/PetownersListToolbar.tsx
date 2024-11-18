import { PetownersListFilter } from "./PetownersListFilter";
// import { exportToExcel, exportToPDF } from "../../core/_requests";
import { exportToExcel } from "../../core/_requests";
import { KTIcon } from "../../../../../../../_metronic/helpers";
// import { useQueryResponseData } from "../../core/QueryResponseProvider";
// import { useEffect, useMemo } from "react";
import { useEffect, useState } from "react";
import { PetOwner } from "../../core/_models";
import axios from "axios";

// const exampleData: PetOwner[] = [
// 	{
// 		id: 1,
// 		name: "Jamaica Sambrano",
// 		email: "sambrano@gmail.com",
// 		phone_number: "09605793928",
// 		addr_zone: "11",
// 		addr_brgy: "Abar Ist",
// 		pets: [
// 			{
// 				id: 101,
// 				name: "Klay",
// 				breed: "Puspin (Philippine Native)",
// 				date_of_birth: "2024-11-03",
// 				status: "pending",
// 				medications: [
// 					{
// 						type: "Parvoviridae",
// 						name: "Vaccine 1",
// 						or_batch: "50",
// 						veterinarian: "Dr. Vet",
// 						expiry: "2024-12-20",
// 						next_vaccination: "None",
// 						fee: "PHP0",
// 						remarks: "Mass",
// 					},
// 					{
// 						type: "Antiparasitic",
// 						name: "Deworming",
// 						or_batch: "51",
// 						veterinarian: "Dr. Vet",
// 						expiry: "2025-01-10",
// 						next_vaccination: "None",
// 						fee: "PHP50",
// 						remarks: "None",
// 					},
// 				],
// 			},
// 			{
// 				id: 102,
// 				name: "Bella",
// 				breed: "Aspin (Philippine Native)",
// 				date_of_birth: "2024-02-10",
// 				status: "approved",
// 				medications: [
// 					{
// 						type: "Rabies Vaccine",
// 						name: "Rabies Shot",
// 						or_batch: "60",
// 						veterinarian: "Dr. Vet",
// 						expiry: "2025-02-15",
// 						next_vaccination: "None",
// 						fee: "PHP100",
// 						remarks: "Routine",
// 					},
// 				],
// 			},
// 		],
// 	},
// 	{
// 		id: 2,
// 		name: "Jhomar Candelario",
// 		email: "candelario@gmail.com",
// 		phone_number: "09982369196",
// 		addr_zone: "4",
// 		addr_brgy: "Caanawan",
// 		pets: [
// 			{
// 				id: 201,
// 				name: "Cody",
// 				breed: "Aspin (Philippine Native)",
// 				date_of_birth: "2024-02-14",
// 				status: "pending",
// 				medications: [
// 					{
// 						type: "Deworming",
// 						name: "Deworm Shot",
// 						or_batch: "55",
// 						veterinarian: "Dr. Animal Care",
// 						expiry: "2024-11-30",
// 						next_vaccination: "2025-05-01",
// 						fee: "PHP75",
// 						remarks: "None",
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

const PetownersListToolbar = () => {
	// const users = useQueryResponseData();
	// const data = 1useMemo(() => users, [users]);
	const [data, setData] = useState<PetOwner[]>([]);

	// Function to fetch data
	const fetchPetOwnersWithPetsAndMedications = async (): Promise<
		PetOwner[]
	> => {
		try {
			// Make the API request
			const response = await axios.get<PetOwner[]>(
				"http://192.168.100.86:8080/api/petowners-all-data" // Replace with your actual API URL
			);

			// Return the data as is
			return response.data;
		} catch (error) {
			console.error("Error fetching pet owner data:", error);
			throw new Error("Failed to fetch pet owner data");
		}
	};

	// Fetch data on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchPetOwnersWithPetsAndMedications();
				setData(result); // Update the state with fetched data
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);
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
			{/* <button
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
			</button> */}
		</div>
	);
};

export { PetownersListToolbar };
