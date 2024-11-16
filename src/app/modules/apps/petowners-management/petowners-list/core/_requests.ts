import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { User, UsersQueryResponse } from "./_models";

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
const exportToExcel = (data: User[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `Veterinarians_${currentDate}_${randomNum}`;

	// Map data to a format suitable for Excel
	const formattedData = data.map((user) => ({
		Name: user.name,
		Email: user.email,
		"Phone Number": user.phone_number,
		Address:
			"Zone " +
			user.addr_zone +
			", Brgy." +
			user.addr_brgy +
			", San Jose City, NE",
	}));

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

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Add a general worksheet with all veterinarians
	const generalWorksheet = XLSX.utils.json_to_sheet(formattedData);
	generalWorksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Email
		{ wpx: 150 }, // Phone Number
		{ wpx: 250 }, // Address
	];
	XLSX.utils.book_append_sheet(workbook, generalWorksheet, "Veterinarians");

	// Add a worksheet for each barangay
	barangays.forEach((barangay) => {
		const barangayData = data
			.filter((user) => user.addr_brgy === barangay) // Filter users by barangay
			.map((user) => ({
				Name: user.name,
				Email: user.email,
				"Phone Number": user.phone_number,
				Address:
					"Zone " +
					user.addr_zone +
					", Brgy." +
					user.addr_brgy +
					", San Jose City, NE",
			}));

		if (barangayData.length > 0) {
			const barangayWorksheet = XLSX.utils.json_to_sheet(barangayData);
			barangayWorksheet["!cols"] = [
				{ wpx: 150 }, // Name
				{ wpx: 200 }, // Email
				{ wpx: 150 }, // Phone Number
				{ wpx: 250 }, // Address
			];
			XLSX.utils.book_append_sheet(workbook, barangayWorksheet, barangay);
		}
	});

	// Write to an Excel file and trigger the download
	XLSX.writeFile(workbook, `${fileName}.xlsx`);
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
	exportToExcel,
	exportToPDF,
	getUsers,
	deleteUser,
	deleteSelectedUsers,
	getUserById,
	createUser,
	updateUser,
};
