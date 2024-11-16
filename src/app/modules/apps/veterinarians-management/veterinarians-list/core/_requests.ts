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
	const fileName = `Veterinarians_${currentDate}_${randomNum}`;

	// Map data to a format suitable for Excel
	const formattedData = data.map((user) => ({
		Name: user.name,
		Email: user.email,
		Position: user.position,
		"License Number": user.license_number,
		"Phone Number": user.phone_number,
		Status: user.status,
	}));
	// Filter and map data to include only specific statuses
	const approvedVeterinarians = data
		.filter((user) => user.status === "approved") // Include only "Pending" or "Approved"
		.map((user) => ({
			Name: user.name,
			Email: user.email,
			Position: user.position,
			"License Number": user.license_number,
			"Phone Number": user.phone_number,
			Status: user.status, // Capitalize status (e.g., "Pending")
		}));

	// Create a new workbook and add a worksheet
	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(formattedData);

	// Define column widths
	worksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Position
		{ wpx: 120 }, // Position
		{ wpx: 150 }, // License Number
		{ wpx: 150 }, // Phone Number
		{ wpx: 100 }, // Status
	];

	// Append the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, "Veterinarians");
	// Add a worksheet for approved veterinarians
	const approvedWorksheet = XLSX.utils.json_to_sheet(approvedVeterinarians);
	approvedWorksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Email
		{ wpx: 120 }, // Position
		{ wpx: 150 }, // License Number
		{ wpx: 150 }, // Phone Number
		{ wpx: 100 }, // Status
	];
	XLSX.utils.book_append_sheet(
		workbook,
		approvedWorksheet,
		"Approved Veterinarians"
	);

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
		user.position,
		user.license_number,
		user.phone_number,
		user.status,
	]);

	// Filter and format "Approved" veterinarians
	const approvedData = data
		.filter((user) => user.status === "approved")
		.map((user) => [
			user.name,
			user.email,
			user.position,
			user.license_number,
			user.phone_number,
			user.status, // Capitalize status
		]);

	// Create a new PDF document
	const doc = new jsPDF();

	// Page 1: All Veterinarians
	const title = "San Jose City Veterinary Clinic";
	const subtitle = "All Veterinarians";

	// Calculate centered position for the title
	const pageWidth = doc.internal.pageSize.getWidth();
	const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
	const subtitleX = (pageWidth - doc.getTextWidth(subtitle)) / 2;

	// Add centered title for the first page
	doc.text(title, titleX, 10);
	doc.text(subtitle, subtitleX, 17);

	// Add table for all data
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
		body: formattedData,
		startY: 20,
		styles: { fontSize: 10 },
	});

	// Add a new page for Approved Veterinarians
	doc.addPage();

	// Page 2: Approved Veterinarians
	const approvedSubtitle = "Approved Veterinarians";
	const approvedSubtitleX =
		(pageWidth - doc.getTextWidth(approvedSubtitle)) / 2;

	// Add title for the second page
	doc.text(title, titleX, 10);
	doc.text(approvedSubtitle, approvedSubtitleX, 17);

	// Add table for approved data
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
		body: approvedData,
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
	approveVet,
	declineVet,
	archiveVet,
	unarchiveVet,
};
