import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Event, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/events`;
const GET_USERS_URL = `${API_URL}/events`;
const GET_BY_ADDRESS = `${API_URL}/notification/by-address`;
const PUSH_URL_NOTIF = "https://exp.host/--/api/v2/push/send";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

type Notif = {
	to?: string;
	title?: string | undefined;
	body?: string;
};

const getEvents = (query: string): Promise<UsersQueryResponse> => {
	return axios
		.get(`${GET_USERS_URL}?${query}`)
		.then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};
const getNotificationTokens = (query: string): Promise<UsersQueryResponse> => {
	return axios
		.get(`${GET_BY_ADDRESS}?${query}`)
		.then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};
const getEventById = (id: ID): Promise<Event | undefined> => {
	return axios
		.get(`${USER_URL}/${id}`)
		.then((response: AxiosResponse<Response<Event>>) => response.data)
		.then((response: Response<Event>) => response.data);
};

const pushNotif = (notif: Notif): Promise<Event | undefined> => {
	return axios
		.post(PUSH_URL_NOTIF, notif)
		.then((response: AxiosResponse<Response<Event>>) => response.data)
		.then((response: Response<Event>) => response.data);
};

const createEvent = (event: Event): Promise<Event | undefined> => {
	return axios
		.post(USER_URL, event)
		.then((response: AxiosResponse<Response<Event>>) => response.data)
		.then((response: Response<Event>) => response.data);
};

const updateEvent = (event: Event): Promise<Event | undefined> => {
	return axios
		.put(`${USER_URL}/${event.id}`, event)
		.then((response: AxiosResponse<Response<Event>>) => response.data)
		.then((response: Response<Event>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
	return axios.delete(`${USER_URL}/${userId}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
	const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
	return axios.all(requests).then(() => {});
};

const formattedDateTime = (date_time: string | undefined): string => {
	if (!date_time) return "Invalid Date"; // Handle undefined or null
	const date = new Date(date_time);
	if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid date strings
	return date.toLocaleString("en-PH", {
		month: "long", // Full month name (e.g., "October")
		day: "2-digit", // Day with leading zero (e.g., "04")
		year: "numeric", // Full year (e.g., "2024")
		hour: "2-digit", // Hour (12-hour format)
		minute: "2-digit", // Minute with leading zero (e.g., "08:00")
		hour12: true, // 12-hour format with AM/PM
	});
};

const exportToExcel = (data: Event[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `Events_${currentDate}_${randomNum}`;

	// Map data to a format suitable for Excel
	const formattedData = data.map((user) => ({
		Name: user.name,
		"Date Time": formattedDateTime(user.date_time),
		Place: user.place,
		Description: user.description,
	}));

	// Create a new workbook and add a worksheet
	const workbook = XLSX.utils.book_new();
	const worksheet = XLSX.utils.json_to_sheet(formattedData);

	// Define column widths
	worksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Email
		{ wpx: 300 }, // Phone Number
		{ wpx: 500 }, // Address
	];

	// Append the worksheet to the workbook
	XLSX.utils.book_append_sheet(workbook, worksheet, "Events");

	// Write to an Excel file and trigger the download
	XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const exportToPDF = (data: Event[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `Events_${currentDate}_${randomNum}.pdf`;

	// Map data to format suitable for PDF table
	const formattedData = data.map((user) => [
		user.name,
		formattedDateTime(user.date_time),
		user.place,
		user.description,
	]);

	// Create a new PDF document
	const doc = new jsPDF();

	// Set title text
	const title = "San Jose City Veterinary Clinic";
	const subtitle = "Events";

	// Calculate centered position for the title
	const pageWidth = doc.internal.pageSize.getWidth();
	const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
	const subtitleX = (pageWidth - doc.getTextWidth(subtitle)) / 2;

	// Add centered title
	doc.text(title, titleX, 10); // Adjust the y-position (10) as needed
	doc.text(subtitle, subtitleX, 17); // Adjust the y-position (10) as needed

	// Add table to PDF
	doc.autoTable({
		head: [["Name", "Date Time", "Place", "Description"]],
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
	pushNotif,
	getEvents,
	deleteUser,
	deleteSelectedUsers,
	getNotificationTokens,
	getEventById,
	createEvent,
	updateEvent,
};
