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
const exportToExcel = (data: MNames[]): void => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `MedicationNames_${currentDate}_${randomNum}.xlsx`;

	// Group data by medtype.name and filter by status
	const groupedData: Record<string, { Name: string; Status: string }[]> =
		data.reduce((acc, item) => {
			const medTypeName = item.medtype?.name || "Uncategorized";
			const status = item.status || "Unknown";

			// Create keys for active and inactive for each medType
			const activeKey = `${medTypeName} - Active`;
			const inactiveKey = `${medTypeName} - Inactive`;

			// Group active medications
			if (status === "Active") {
				if (!acc[activeKey]) {
					acc[activeKey] = [];
				}
				acc[activeKey].push({
					Name: item.name,
					Status: status,
				});
			}

			// Group inactive medications
			if (status === "Inactive") {
				if (!acc[inactiveKey]) {
					acc[inactiveKey] = [];
				}
				acc[inactiveKey].push({
					Name: item.name,
					Status: status,
				});
			}

			return acc;
		}, {} as Record<string, { Name: string; Status: string }[]>);

	// Add "All Medications" sheet with both Active and Inactive
	groupedData["All Medications"] = data.map((item) => ({
		Name: item.name,
		Status: item.status,
		MedicationType: item.medtype?.name,
	}));

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Function to create a dynamic title for the top of each sheet
	const addTitleAndDataToSheet = (
		worksheet: XLSX.WorkSheet,
		title: string,
		headers: string[],
		data: { [key: string]: string | undefined }[]
	) => {
		// Add title at A1
		XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });
		// Merge cells for the title row
		worksheet["!merges"] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
		];

		// Add headers at A2
		XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A2" });

		// Add data starting from A3
		XLSX.utils.sheet_add_json(worksheet, data, {
			origin: "A3",
			skipHeader: true,
		});
	};

	// Iterate through grouped data and add a worksheet for each group
	Object.entries(groupedData).forEach(([sheetName, records]) => {
		const worksheet = XLSX.utils.json_to_sheet([]);

		// Generate date and time for titles
		const now = new Date();
		const formattedDate = now.toLocaleString("en-PH", {
			month: "long",
			day: "2-digit",
			year: "numeric",
		});
		const formattedTime = now.toLocaleString("en-PH", {
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		});

		// Determine dynamic title for each sheet
		let title = "";
		if (sheetName === "All Medications") {
			title = `All Medications as of ${formattedDate} at ${formattedTime}`;
		} else {
			const [medType, status] = sheetName.split(" - ");
			title = `All ${status} ${medType} Medications as of ${formattedDate} at ${formattedTime}`;
		}

		// Define headers
		const headers = [
			"Name",
			"Status",
			...(sheetName === "All Medications" ? ["MedicationType"] : []),
		];

		// Add title, headers, and data to worksheet
		addTitleAndDataToSheet(worksheet, title, headers, records);

		// Define column widths
		worksheet["!cols"] = [
			{ wpx: 150 }, // Name
			{ wpx: 150 }, // Status
			...(sheetName === "All Medications" ? [{ wpx: 150 }] : []), // MedicationType column for "All Medications"
		];

		// Append worksheet to workbook
		XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
	});

	// Write to an Excel file and trigger the download
	XLSX.writeFile(workbook, fileName);
};
const exportToPDF = (data: MNames[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `MedicationNames_${currentDate}_${randomNum}.pdf`;

	// Group data by medtype.name and filter by status
	const groupedData: Record<string, { Name: string; Status: string }[]> =
		data.reduce((acc, item) => {
			const medTypeName = item.medtype?.name || "Uncategorized";
			const status = item.status || "Unknown";

			// Create keys for active and inactive for each medType
			const activeKey = `${medTypeName} - Active`;
			const inactiveKey = `${medTypeName} - Inactive`;

			// Group active medications
			if (status === "Active") {
				if (!acc[activeKey]) {
					acc[activeKey] = [];
				}
				acc[activeKey].push({
					Name: item.name,
					Status: status,
				});
			}

			// Group inactive medications
			if (status === "Inactive") {
				if (!acc[inactiveKey]) {
					acc[inactiveKey] = [];
				}
				acc[inactiveKey].push({
					Name: item.name,
					Status: status,
				});
			}

			return acc;
		}, {} as Record<string, { Name: string; Status: string }[]>);

	// Add "All Medications" to grouped data
	groupedData["All Medications"] = data.map((item) => ({
		Name: item.name,
		Status: item.status,
		MedicationType: item.medtype?.name,
	}));

	// Create a new PDF document
	const doc = new jsPDF();

	// Generate date and time for titles
	const now = new Date();
	const formattedDate = now.toLocaleString("en-PH", {
		month: "long",
		day: "2-digit",
		year: "numeric",
	});
	const formattedTime = now.toLocaleString("en-PH", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	// Add a clinic title at the top
	const clinicTitle = "San Jose City Veterinary Clinic";

	// Iterate through grouped data and create a table for each group
	Object.entries(groupedData).forEach(([sheetName, records], index) => {
		if (index > 0) doc.addPage(); // Add a new page for every table after the first

		// Add section title for the group
		let title = "";
		if (sheetName === "All Medications") {
			title = `All Medications as of ${formattedDate} at ${formattedTime}`;
		} else {
			const [medType, status] = sheetName.split(" - ");
			title = `All ${status} ${medType} Medications as of ${formattedDate} at ${formattedTime}`;
		}

		// Add centered clinic title and section title
		const pageWidth = doc.internal.pageSize.getWidth();
		doc.setFontSize(14);
		doc.text(clinicTitle, pageWidth / 2, 10, { align: "center" });
		doc.setFontSize(12);
		doc.text(title, pageWidth / 2, 20, { align: "center" });

		// Prepare table data
		const tableData = records.map((item) => [item.Name, item.Status]);

		// Add the table for this group
		doc.autoTable({
			head: [["Name", "Status"]],
			body: tableData,
			startY: 30,
			styles: { fontSize: 10 },
		});
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
