import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { MNames, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/medtype`;
const GET_USERS_URL = `${API_URL}/medtype`;
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const getMNames = (
	medtypeId: string | undefined,
	query: string
): Promise<UsersQueryResponse> => {
	return axios
		.get(`${GET_USERS_URL}/${medtypeId}/medname?${query}`)
		.then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getMNameById = (
	medtypeId: string | undefined,
	id: ID
): Promise<MNames | undefined> => {
	return axios
		.get(`${GET_USERS_URL}/${medtypeId}/medname/${id}`)
		.then((response: AxiosResponse<Response<MNames>>) => response.data)
		.then((response: Response<MNames>) => response.data);
};

const createMName = (
	medtypeId: string | undefined,
	mnames: MNames
): Promise<MNames | undefined> => {
	return axios
		.post(`${USER_URL}/${medtypeId}/medname`, mnames)
		.then((response: AxiosResponse<Response<MNames>>) => response.data)
		.then((response: Response<MNames>) => response.data);
};

const updateMName = (
	medtypeId: string | undefined,
	mnames: MNames
): Promise<MNames | undefined> => {
	return axios
		.put(`${USER_URL}/${medtypeId}/medname/${mnames.id}`, mnames)
		.then((response: AxiosResponse<Response<MNames>>) => response.data)
		.then((response: Response<MNames>) => response.data);
};

const deleteMName = (mnameID: ID): Promise<void> => {
	return axios.delete(`${USER_URL}/${mnameID}/medname-delete`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
	const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
	return axios.all(requests).then(() => {});
};

const exportToExcel = (data: MNames[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `MedicationNames_${currentDate}_${randomNum}`;
	console.log(data);

	// Map data to a format suitable for Excel
	const formattedData = data.map((user) => ({
		Name: user.name,
		Status: user.status,
	}));

	// Create a new workbook and add a worksheet
	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(formattedData);

	// Define column widths
	worksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 150 }, // Email
	];

	// Append the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, "Medication Names");

	// Write to an Excel file and trigger the download
	XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const exportToPDF = (data: MNames[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `MedicationNames_${currentDate}_${randomNum}.pdf`;

	// Map data to format suitable for PDF table
	const formattedData = data.map((user) => [user.name, user.status]);

	// Create a new PDF document
	const doc = new jsPDF();

	// Set title text
	const title = "San Jose City Veterinary Clinic";
	const subtitle = "Medication Names";

	// Calculate centered position for the title
	const pageWidth = doc.internal.pageSize.getWidth();
	const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
	const subtitleX = (pageWidth - doc.getTextWidth(subtitle)) / 2;

	// Add centered title
	doc.text(title, titleX, 10); // Adjust the y-position (10) as needed
	doc.text(subtitle, subtitleX, 17); // Adjust the y-position (10) as needed

	// Add table to PDF
	doc.autoTable({
		head: [["Name", "Status"]],
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
	getMNames,
	deleteMName,
	deleteSelectedUsers,
	getMNameById,
	createMName,
	updateMName,
};
