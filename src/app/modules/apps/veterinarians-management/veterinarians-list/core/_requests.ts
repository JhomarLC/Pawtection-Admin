import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { User, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/veterinarians`;
const GET_USERS_URL = `${API_URL}/veterinarians`;
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

const approveVet = (userId: ID): Promise<void> => {
	return axios.put(`${USER_URL}/${userId}/approve`).then(() => {});
};

const declineVet = (userId: ID): Promise<void> => {
	return axios.put(`${USER_URL}/${userId}/decline`).then(() => {});
};

const archiveVet = (userId: ID): Promise<void> => {
	return axios.put(`${USER_URL}/${userId}/archive`).then(() => {});
};

const unarchiveVet = (userId: ID): Promise<void> => {
	return axios.put(`${USER_URL}/${userId}/approve`).then(() => {});
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
	const fileName = `Veterinarians_${currentDate}_${randomNum}.xlsx`;

	// Generate title with the current date and time
	const now = new Date();
	const formattedNow = now.toLocaleString("en-PH", {
		month: "long",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	// Utility function to capitalize the first letter of a string
	const capitalize = (str: string) =>
		str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

	// Map data to a format suitable for Excel
	const formattedData = data.map((user) => ({
		Name: user.name,
		Email: user.email,
		Position: user.position,
		"License Number": user.license_number,
		"Phone Number": user.phone_number,
		Status: capitalize(user.status || "Unknown"),
	}));

	// Group data by status
	const groupedData: Record<string, User[]> = data.reduce((acc, user) => {
		const status = capitalize(user.status || "Unknown");
		if (!acc[status]) acc[status] = [];
		acc[status].push(user);
		return acc;
	}, {} as Record<string, User[]>);

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Function to add a title row and merge cells
	const addTitleToSheet = (
		worksheet: XLSX.WorkSheet,
		title: string,
		columns: number
	) => {
		// Add title at A1
		XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });
		// Merge cells for the title row
		worksheet["!merges"] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: columns - 1 } },
		];
	};

	// Add "All Veterinarians" sheet
	const allVeterinariansTitle = `All Veterinarians as of ${formattedNow}`;
	const allVeterinariansWorksheet = XLSX.utils.json_to_sheet(formattedData);
	allVeterinariansWorksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Email
		{ wpx: 120 }, // Position
		{ wpx: 150 }, // License Number
		{ wpx: 150 }, // Phone Number
		{ wpx: 100 }, // Status
	];
	addTitleToSheet(allVeterinariansWorksheet, allVeterinariansTitle, 6); // 6 columns
	XLSX.utils.book_append_sheet(
		workbook,
		allVeterinariansWorksheet,
		"All Veterinarians"
	);

	// Add a sheet for each status
	Object.entries(groupedData).forEach(([status, users]) => {
		const statusTitle = `All ${status} Veterinarians as of ${formattedNow}`;
		const statusData = users.map((user) => ({
			Name: user.name,
			Email: user.email,
			Position: user.position,
			"License Number": user.license_number,
			"Phone Number": user.phone_number,
			Status: capitalize(user.status || "Unknown"),
		}));

		const statusWorksheet = XLSX.utils.json_to_sheet(statusData);
		statusWorksheet["!cols"] = [
			{ wpx: 150 }, // Name
			{ wpx: 200 }, // Email
			{ wpx: 120 }, // Position
			{ wpx: 150 }, // License Number
			{ wpx: 150 }, // Phone Number
			{ wpx: 100 }, // Status
		];
		addTitleToSheet(statusWorksheet, statusTitle, 6); // 6 columns
		XLSX.utils.book_append_sheet(
			workbook,
			statusWorksheet,
			`${status} Veterinarians`
		);
	});

	// Write to an Excel file and trigger the download
	XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const exportToPDF = (data: User[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `Veterinarians_${currentDate}_${randomNum}.pdf`;

	// Utility function to capitalize the first letter of a string
	const capitalize = (str: string) =>
		str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

	// Generate title with the current date and time
	const now = new Date();
	const formattedNow = now.toLocaleString("en-PH", {
		month: "long",
		day: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	// Map data to format suitable for PDF table
	const formattedData = data.map((user) => [
		user.name,
		user.email,
		user.position,
		user.license_number,
		user.phone_number,
		capitalize(user.status || "Unknown"),
	]);

	// Group data by status
	const groupedData: Record<string, User[]> = data.reduce((acc, user) => {
		const status = capitalize(user.status || "Unknown");
		if (!acc[status]) acc[status] = [];
		acc[status].push(user);
		return acc;
	}, {} as Record<string, User[]>);

	// Create a new PDF document
	const doc = new jsPDF();

	// Function to add a title and table for each section
	const addSectionToPDF = (
		doc: jsPDF,
		title: string,
		subtitle: string,
		data: any[]
	) => {
		// Calculate centered position for titles
		const pageWidth = doc.internal.pageSize.getWidth();
		const titleX = pageWidth / 2;

		// Add title and subtitle
		doc.setFontSize(14);
		doc.text(title, titleX, 10, { align: "center" });
		doc.setFontSize(10);
		doc.text(subtitle, titleX, 17, { align: "center" });

		// Add table
		doc.autoTable({
			head: [
				[
					"Name",
					"Email",
					"Position",
					"License Number",
					"Phone Number",
					"Status",
				],
			],
			body: data,
			startY: 25,
			styles: { fontSize: 10 },
		});
	};

	// Add the "All Veterinarians" section
	const clinicTitle = "San Jose City Veterinary Clinic";
	const allVeterinariansSubtitle = `All Veterinarians as of ${formattedNow}`;
	addSectionToPDF(doc, clinicTitle, allVeterinariansSubtitle, formattedData);

	// Add a new page for each status
	Object.entries(groupedData).forEach(([status, users]) => {
		doc.addPage();
		const statusSubtitle = `All ${status} Veterinarians as of ${formattedNow}`;
		const statusData = users.map((user) => [
			user.name,
			user.email,
			user.position,
			user.license_number,
			user.phone_number,
			capitalize(user.status || "Unknown"),
		]);
		addSectionToPDF(doc, clinicTitle, statusSubtitle, statusData);
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
	approveVet,
	declineVet,
	archiveVet,
	unarchiveVet,
};
