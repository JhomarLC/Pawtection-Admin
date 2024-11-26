import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { User, UsersQueryResponse, PetOwner } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/petowners`;
const GET_USERS_URL = `${API_URL}/petowners`;
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const getUsers = (query: string): Promise<UsersQueryResponse> => {
	return axios
		.get(`${GET_USERS_URL}?${query}`)
		.then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getUserById = (id: ID): Promise<User | undefined> => {
	return axios
		.get(`${USER_URL}/${id}`)
		.then((response: AxiosResponse<Response<User>>) => response.data)
		.then((response: Response<User>) => response.data);
};

const createUser = (user: User): Promise<User | undefined> => {
	return axios
		.put(USER_URL, user)
		.then((response: AxiosResponse<Response<User>>) => response.data)
		.then((response: Response<User>) => response.data);
};

const updateUser = (user: User): Promise<User | undefined> => {
	return axios
		.post(`${USER_URL}/${user.id}`, user)
		.then((response: AxiosResponse<Response<User>>) => response.data)
		.then((response: Response<User>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
	return axios.delete(`${USER_URL}/${userId}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
	const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
	return axios.all(requests).then(() => {});
};
// const exportToExcel = (data: User[]) => {
// 	// Generate file name with current date and random number
// 	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
// 	const randomNum = Math.floor(Math.random() * 1000);
// 	const fileName = `Veterinarians_${currentDate}_${randomNum}`;

// 	// Map data to a format suitable for Excel
// 	const formattedData = data.map((user) => ({
// 		Name: user.name,
// 		Email: user.email,
// 		"Phone Number": user.phone_number,
// 		Address:
// 			"Zone " +
// 			user.addr_zone +
// 			", Brgy." +
// 			user.addr_brgy +
// 			", San Jose City, NE",
// 	}));

// 	// List of barangays
// 	const barangays = [
// 		"A. Pascual",
// 		"Abar Ist",
// 		"Abar 2nd",
// 		"Bagong Sikat",
// 		"Caanawan",
// 		"Calaocan",
// 		"Camanacsacan",
// 		"Culaylay",
// 		"Dizol",
// 		"Kaliwanagan",
// 		"Kita-Kita",
// 		"Malasin",
// 		"Manicla",
// 		"Palestina",
// 		"Parang Mangga",
// 		"Villa Joson",
// 		"Pinili",
// 		"Rafael Rueda, Sr. Pob.",
// 		"Ferdinand E. Marcos Pob.",
// 		"Canuto Ramos Pob.",
// 		"Raymundo Eugenio Pob.",
// 		"Crisanto Sanchez Pob.",
// 		"Porais",
// 		"San Agustin",
// 		"San Juan",
// 		"San Mauricio",
// 		"Santo Niño 1st",
// 		"Santo Niño 2nd",
// 		"Santo Tomas",
// 		"Sibut",
// 		"Sinipit Bubon",
// 		"Santo Niño 3rd",
// 		"Tabulac",
// 		"Tayabo",
// 		"Tondod",
// 		"Tulat",
// 		"Villa Floresca",
// 		"Villa Marina",
// 	];

// 	// Create a new workbook
// 	const workbook = XLSX.utils.book_new();

// 	// Add a general worksheet with all veterinarians
// 	const generalWorksheet = XLSX.utils.json_to_sheet(formattedData);
// 	generalWorksheet["!cols"] = [
// 		{ wpx: 150 }, // Name
// 		{ wpx: 200 }, // Email
// 		{ wpx: 150 }, // Phone Number
// 		{ wpx: 250 }, // Address
// 	];
// 	XLSX.utils.book_append_sheet(workbook, generalWorksheet, "Veterinarians");

// 	// Add a worksheet for each barangay
// 	barangays.forEach((barangay) => {
// 		const barangayData = data
// 			.filter((user) => user.addr_brgy === barangay) // Filter users by barangay
// 			.map((user) => ({
// 				Name: user.name,
// 				Email: user.email,
// 				"Phone Number": user.phone_number,
// 				Address:
// 					"Zone " +
// 					user.addr_zone +
// 					", Brgy." +
// 					user.addr_brgy +
// 					", San Jose City, NE",
// 			}));

// 		if (barangayData.length > 0) {
// 			const barangayWorksheet = XLSX.utils.json_to_sheet(barangayData);
// 			barangayWorksheet["!cols"] = [
// 				{ wpx: 150 }, // Name
// 				{ wpx: 200 }, // Email
// 				{ wpx: 150 }, // Phone Number
// 				{ wpx: 250 }, // Address
// 			];
// 			XLSX.utils.book_append_sheet(workbook, barangayWorksheet, barangay);
// 		}
// 	});

// 	// Write to an Excel file and trigger the download
// 	XLSX.writeFile(workbook, `${fileName}.xlsx`);
// };

const exportToExcel = (data: PetOwner[]): void => {
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `PetOwners_${currentDate}_${randomNum}.xlsx`;

	// Prepare data for Medications sheet
	const medicationsData = data
		.flatMap((owner) =>
			owner.pets.flatMap((pet) =>
				pet.medications.map((medication) => ({
					// "Owner ID": owner.id, // Linking medication to owner
					// "Pet ID": pet.id, // Linking medication to pet
					"Owner Name": owner.name,
					Address:
						"Zone " + owner.addr_zone + ", Brgy." + owner.addr_brgy,
					"Contact #": owner.phone_number,
					"Pet Name": pet.name,
					"Date of Birth": pet.date_of_birth,
					Gender: pet.gender,
					"Pet Color": pet.color_description,
					"Pet Breed": pet.breed,
					"Medication Date": medication.medication_date,
					"Medication Type": medication.type.name,
					"Medication Name": medication.name,
					"OR Number": medication.or_number,
					Veterinarian: medication.veterinarian,
					// Expiry: medication.expiry,
					"Next Vaccination": medication.next_vaccination,
					Fee: medication.fee,
					Remarks: medication.remarks,
				}))
			)
		)
		.sort((a, b) => {
			// Convert Medication Date to Date object for sorting
			const dateA = new Date(a["Medication Date"]);
			const dateB = new Date(b["Medication Date"]);
			return dateB.getTime() - dateA.getTime(); // Sort ascending
		});

	// Create a workbook
	const workbook = XLSX.utils.book_new();

	// const medicationsSheet = XLSX.utils.json_to_sheet(medicationsData);
	const medicationsSheet = XLSX.utils.json_to_sheet([]);
	XLSX.utils.sheet_add_aoa(medicationsSheet, [["Medications Data"]], {
		origin: "A1",
	});
	XLSX.utils.sheet_add_json(medicationsSheet, medicationsData, {
		origin: "A2",
	});

	medicationsSheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 14 } }]; // Merge title across 15 columns

	medicationsSheet["!cols"] = [
		// { wpx: 100 }, // Owner ID
		// { wpx: 100 }, // Pet ID
		{ wpx: 150 }, // Owner Name
		{ wpx: 150 }, // Owner Address
		{ wpx: 100 }, // Owner CP#
		{ wpx: 80 }, // Pet Name
		{ wpx: 80 }, // Pet DOB
		{ wpx: 50 }, // Pet Gender
		{ wpx: 100 }, // Pet Color
		{ wpx: 150 }, // Pet Breed
		{ wpx: 150 }, // Medication Date
		{ wpx: 150 }, // Medication Type
		{ wpx: 150 }, // Medication Name
		{ wpx: 80 }, // OR Number
		{ wpx: 150 }, // Veterinarian
		{ wpx: 100 }, // Next Vaccination
		{ wpx: 30 }, // Fee
		{ wpx: 50 }, // Remarks
	];

	// Append sheets to workbook
	// XLSX.utils.book_append_sheet(workbook, petOwnersSheet, "Pet Owners");
	// XLSX.utils.book_append_sheet(workbook, petsSheet, "Pets");
	XLSX.utils.book_append_sheet(
		workbook,
		medicationsSheet,
		"All Health Record"
	);

	// List of barangays
	const barangays = [
		"A. Pascual",
		"Abar Ist",
		"Abar 2nd",
		"Bagong Sikat",
		"Caanawan",
		"Calaocan",
		"Camanacsacan",
		"Culaylay",
		"Dizol",
		"Kaliwanagan",
		"Kita-Kita",
		"Malasin",
		"Manicla",
		"Palestina",
		"Parang Mangga",
		"Villa Joson",
		"Pinili",
		"Rafael Rueda, Sr. Pob.",
		"Ferdinand E. Marcos Pob.",
		"Canuto Ramos Pob.",
		"Raymundo Eugenio Pob.",
		"Crisanto Sanchez Pob.",
		"Porais",
		"San Agustin",
		"San Juan",
		"San Mauricio",
		"Santo Niño 1st",
		"Santo Niño 2nd",
		"Santo Tomas",
		"Sibut",
		"Sinipit Bubon",
		"Santo Niño 3rd",
		"Tabulac",
		"Tayabo",
		"Tondod",
		"Tulat",
		"Villa Floresca",
		"Villa Marina",
	];

	// Add a sheet for Medications per barangay
	barangays.forEach((barangay) => {
		const barangayMedicationsData = data
			.filter((owner) => owner.addr_brgy === barangay)
			.flatMap((owner) =>
				owner.pets.flatMap((pet) =>
					pet.medications.map((medication) => ({
						"Owner Name": owner.name,
						Address: `Zone ${owner.addr_zone}, Brgy.${owner.addr_brgy}`,
						"Contact #": owner.phone_number,
						"Pet Name": pet.name,
						"Date of Birth": pet.date_of_birth,
						Gender: pet.gender,
						"Pet Color": pet.color_description,
						"Pet Breed": pet.breed,
						"Medication Date": medication.medication_date,
						"Medication Type": medication.type.name,
						"Medication Name": medication.name,
						"OR Number": medication.or_number,
						Veterinarian: medication.veterinarian,
						"Next Vaccination": medication.next_vaccination,
						Fee: medication.fee,
						Remarks: medication.remarks,
					}))
				)
			)
			.sort((a, b) => {
				// Convert Medication Date to Date object for sorting
				const dateA = new Date(a["Medication Date"]);
				const dateB = new Date(b["Medication Date"]);
				return dateB.getTime() - dateA.getTime(); // Sort ascending
			});

		if (barangayMedicationsData.length > 0) {
			const barangaySheet = XLSX.utils.json_to_sheet([]);
			XLSX.utils.sheet_add_aoa(
				barangaySheet,
				[[`${barangay} Medications`]],
				{ origin: "A1" }
			);
			XLSX.utils.sheet_add_json(barangaySheet, barangayMedicationsData, {
				origin: "A2",
			});

			barangaySheet["!merges"] = [
				{ s: { r: 0, c: 0 }, e: { r: 0, c: 14 } },
			]; // Merge title across 15 columns

			// Apply column widths to the barangay sheet
			barangaySheet["!cols"] = [
				{ wpx: 150 }, // Owner Name
				{ wpx: 150 }, // Owner Address
				{ wpx: 100 }, // Contact #
				{ wpx: 80 }, // Pet Name
				{ wpx: 80 }, // Pet DOB
				{ wpx: 50 }, // Pet Gender
				{ wpx: 100 }, // Pet Color
				{ wpx: 150 }, // Pet Breed
				{ wpx: 150 }, // Medication Date
				{ wpx: 150 }, // Medication Type
				{ wpx: 150 }, // Medication Name
				{ wpx: 80 }, // OR Number
				{ wpx: 150 }, // Veterinarian
				{ wpx: 100 }, // Next Vaccination
				{ wpx: 30 }, // Fee
				{ wpx: 50 }, // Remarks
			];

			// Append the barangay sheet to the workbook
			XLSX.utils.book_append_sheet(
				workbook,
				barangaySheet,
				barangay + " Health Record"
			);
		}
	});
	// Export to Excel
	XLSX.writeFile(workbook, fileName);
};

const exportToExcelPetOwners = (data: PetOwner[]): void => {
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `PetOwners_${currentDate}_${randomNum}.xlsx`;

	// Prepare data for Pet Owners sheet
	const petOwnersData = data.map((owner) => ({
		// "Owner ID": owner.id, // Unique identifier for the owner
		Name: owner.name,
		Email: owner.email,
		"Phone Number": owner.phone_number,
		Address: `Zone ${owner.addr_zone}, Brgy.${owner.addr_brgy}, San Jose City, NE`,
	}));

	// List of barangays
	const barangays: string[] = [
		"A. Pascual",
		"Abar Ist",
		"Abar 2nd",
		"Bagong Sikat",
		"Caanawan",
		"Calaocan",
		"Camanacsacan",
		"Culaylay",
		"Dizol",
		"Kaliwanagan",
		"Kita-Kita",
		"Malasin",
		"Manicla",
		"Palestina",
		"Parang Mangga",
		"Villa Joson",
		"Pinili",
		"Rafael Rueda, Sr. Pob.",
		"Ferdinand E. Marcos Pob.",
		"Canuto Ramos Pob.",
		"Raymundo Eugenio Pob.",
		"Crisanto Sanchez Pob.",
		"Porais",
		"San Agustin",
		"San Juan",
		"San Mauricio",
		"Santo Niño 1st",
		"Santo Niño 2nd",
		"Santo Tomas",
		"Sibut",
		"Sinipit Bubon",
		"Santo Niño 3rd",
		"Tabulac",
		"Tayabo",
		"Tondod",
		"Tulat",
		"Villa Floresca",
		"Villa Marina",
	];

	// Create a workbook
	const workbook = XLSX.utils.book_new();

	// Add a sheet for all pet owners
	// const petOwnersSheet = XLSX.utils.json_to_sheet(petOwnersData);
	const petOwnersSheet = XLSX.utils.json_to_sheet([]);
	XLSX.utils.sheet_add_aoa(petOwnersSheet, [["All Pet Owners"]], {
		origin: "A1",
	});
	XLSX.utils.sheet_add_json(petOwnersSheet, petOwnersData, {
		origin: "A2",
	});

	petOwnersSheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }]; // Merge title across 15 columns

	petOwnersSheet["!cols"] = [
		// { wpx: 100 }, // Owner ID
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Email
		{ wpx: 150 }, // Phone Number
		{ wpx: 250 }, // Address
	];

	XLSX.utils.book_append_sheet(workbook, petOwnersSheet, "All Pet Owners");

	// Add sheets for each barangay
	barangays.forEach((barangay) => {
		const barangayData = data
			.filter((owner) => owner.addr_brgy === barangay)
			.map((owner) => ({
				// "Owner ID": owner.id, // Unique identifier for the owner
				Name: owner.name,
				Email: owner.email,
				"Phone Number": owner.phone_number,
				Address: `Zone ${owner.addr_zone}, Brgy.${owner.addr_brgy}, San Jose City, NE`,
			}));

		if (barangayData.length > 0) {
			// const barangaySheet = XLSX.utils.json_to_sheet(barangayData);
			const barangaySheet = XLSX.utils.json_to_sheet([]);
			XLSX.utils.sheet_add_aoa(
				barangaySheet,
				[[`${barangay} - Pet Owners`]],
				{ origin: "A1" }
			);
			XLSX.utils.sheet_add_json(barangaySheet, barangayData, {
				origin: "A2",
			});

			barangaySheet["!merges"] = [
				{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
			];
			barangaySheet["!cols"] = [
				// { wpx: 100 }, // Owner ID
				{ wpx: 150 }, // Name
				{ wpx: 200 }, // Email
				{ wpx: 150 }, // Phone Number
				{ wpx: 250 }, // Address
			];
			XLSX.utils.book_append_sheet(workbook, barangaySheet, barangay);
		}
	});

	// Export to Excel
	XLSX.writeFile(workbook, fileName);
};

const exportToPDF = (data: User[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `Veterinarians_${currentDate}_${randomNum}.pdf`;

	// Map data to format suitable for PDF table
	const formattedData = data.map((user) => [
		user.name,
		user.email,
		user.phone_number,
		"Zone " +
			user.addr_zone +
			", Brgy." +
			user.addr_brgy +
			", San Jose City, NE",
	]);

	// Create a new PDF document
	const doc = new jsPDF();

	// Set title text
	const title = "San Jose City Veterinary Clinic";
	const subtitle = "Veterinarians";

	// Calculate centered position for the title
	const pageWidth = doc.internal.pageSize.getWidth();
	const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
	const subtitleX = (pageWidth - doc.getTextWidth(subtitle)) / 2;

	// Add centered title
	doc.text(title, titleX, 10); // Adjust the y-position (10) as needed
	doc.text(subtitle, subtitleX, 17); // Adjust the y-position (10) as needed

	// Add table to PDF
	doc.autoTable({
		head: [["Name", "Email", "Phone Number", "Address"]],
		body: formattedData,
		startY: 20,
		styles: { fontSize: 10 },
	});

	// Save the PDF
	doc.save(fileName);
};

export {
	exportToExcelPetOwners,
	exportToExcel,
	exportToPDF,
	getUsers,
	deleteUser,
	deleteSelectedUsers,
	getUserById,
	createUser,
	updateUser,
};
