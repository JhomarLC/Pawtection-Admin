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

const formattedDateTime = (
	date_time: string | number | Date | undefined
): string => {
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
	const generalTitle = `All Events as of ${formattedNow}`;

	// Separate data into Upcoming, Done, and All Events
	const upcomingEvents = data
		.filter((event) => {
			if (!event.date_time) return false;
			const eventDate = new Date(event.date_time);
			return eventDate > now;
		})
		.sort(
			(a, b) =>
				new Date(a.date_time || 0).getTime() -
				new Date(b.date_time || 0).getTime()
		);

	const doneEvents = data
		.filter((event) => {
			if (!event.date_time) return false;
			const eventDate = new Date(event.date_time);
			return eventDate <= now;
		})
		.sort(
			(a, b) =>
				new Date(a.date_time || 0).getTime() -
				new Date(b.date_time || 0).getTime()
		);

	const formatEvents = (events: Event[], status: string) => {
		return events.map((event) => ({
			Name: event.name || "Unnamed Event",
			"Date Time": formattedDateTime(event.date_time),
			Status: status,
			Place: event.place || "No Place Specified",
			Description: event.description || "No Description",
		}));
	};

	// Format data for each sheet
	const allEvents = [
		...formatEvents(upcomingEvents, "Upcoming"),
		...formatEvents(doneEvents, "Done"),
	];
	const upcomingEventsSheet = formatEvents(upcomingEvents, "Upcoming");
	const doneEventsSheet = formatEvents(doneEvents, "Done");

	// Create a new workbook
	const workbook = XLSX.utils.book_new();

	// Function to add a title row and merge cells
	const addTitleToSheet = (
		worksheet: XLSX.WorkSheet,
		title: string,
		columns: number
	) => {
		// Shift existing data down by 1 row
		XLSX.utils.sheet_add_aoa(worksheet, [[title]], { origin: "A1" });
		// Merge cells for the title row
		worksheet["!merges"] = [
			{ s: { r: 0, c: 0 }, e: { r: 0, c: columns - 1 } },
		];
	};

	// Add All Events sheet
	const allEventsWorksheet = XLSX.utils.json_to_sheet(allEvents);
	allEventsWorksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Date Time
		{ wpx: 100 }, // Status
		{ wpx: 300 }, // Place
		{ wpx: 500 }, // Description
	];
	addTitleToSheet(allEventsWorksheet, generalTitle, 5); // 5 columns
	XLSX.utils.book_append_sheet(workbook, allEventsWorksheet, "All Events");

	// Add Upcoming Events sheet
	const upcomingEventsTitle = `Upcoming Events as of ${formattedNow}`;
	const upcomingEventsWorksheet =
		XLSX.utils.json_to_sheet(upcomingEventsSheet);
	upcomingEventsWorksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Date Time
		{ wpx: 100 }, // Status
		{ wpx: 300 }, // Place
		{ wpx: 500 }, // Description
	];
	addTitleToSheet(upcomingEventsWorksheet, upcomingEventsTitle, 5); // 5 columns
	XLSX.utils.book_append_sheet(
		workbook,
		upcomingEventsWorksheet,
		"Upcoming Events"
	);

	// Add Done Events sheet
	const doneEventsTitle = `Done Events as of ${formattedNow}`;
	const doneEventsWorksheet = XLSX.utils.json_to_sheet(doneEventsSheet);
	doneEventsWorksheet["!cols"] = [
		{ wpx: 150 }, // Name
		{ wpx: 200 }, // Date Time
		{ wpx: 100 }, // Status
		{ wpx: 300 }, // Place
		{ wpx: 500 }, // Description
	];
	addTitleToSheet(doneEventsWorksheet, doneEventsTitle, 5); // 5 columns
	XLSX.utils.book_append_sheet(workbook, doneEventsWorksheet, "Done Events");

	// Write to an Excel file and trigger the download
	XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const exportToPDF = (data: Event[]) => {
	// Generate file name with current date and random number
	const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const randomNum = Math.floor(Math.random() * 1000);
	const fileName = `Events_${currentDate}_${randomNum}.pdf`;

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

	// Separate data into Upcoming, Done, and All Events
	const upcomingEvents = data
		.filter((event) => {
			if (!event.date_time) return false;
			const eventDate = new Date(event.date_time);
			return eventDate > now;
		})
		.sort(
			(a, b) =>
				new Date(a.date_time || 0).getTime() -
				new Date(b.date_time || 0).getTime()
		);

	const doneEvents = data
		.filter((event) => {
			if (!event.date_time) return false;
			const eventDate = new Date(event.date_time);
			return eventDate <= now;
		})
		.sort(
			(a, b) =>
				new Date(a.date_time || 0).getTime() -
				new Date(b.date_time || 0).getTime()
		);

	const formatEvents = (events: Event[], status: string) => {
		return events.map((event) => [
			event.name || "Unnamed Event",
			formattedDateTime(event.date_time),
			status,
			event.place || "No Place Specified",
			event.description || "No Description",
		]);
	};

	// Format data for each section
	const allEvents = [
		...formatEvents(upcomingEvents, "Upcoming"),
		...formatEvents(doneEvents, "Done"),
	];
	const upcomingEventsData = formatEvents(upcomingEvents, "Upcoming");
	const doneEventsData = formatEvents(doneEvents, "Done");

	// Create a new PDF document
	const doc = new jsPDF();

	// Add a centered title at the top of the document
	const mainTitle = "San Jose City Veterinary Clinic";
	const subTitle = "Event Report";
	const pageWidth = doc.internal.pageSize.getWidth();
	doc.setFontSize(16);
	doc.text(mainTitle, pageWidth / 2, 10, { align: "center" });
	doc.setFontSize(12);
	doc.text(subTitle, pageWidth / 2, 17, { align: "center" });

	// Function to add a title and a table for a specific section
	const addSectionToPDF = (
		title: string,
		data: any[],
		doc: jsPDF,
		startY: number
	) => {
		// Add title for the section
		doc.setFontSize(12);
		doc.text(title, pageWidth / 2, startY, { align: "center" });
		startY += 5;

		// Add table for the section
		doc.autoTable({
			head: [["Name", "Date Time", "Status", "Place", "Description"]],
			body: data,
			startY,
			styles: { fontSize: 10 },
		});

		// Return the updated Y position
		return doc.lastAutoTable.finalY + 10;
	};

	// Add All Events section
	let startY = 25;
	startY = addSectionToPDF(
		`All Events as of ${formattedNow}`,
		allEvents,
		doc,
		startY
	);

	// Add Upcoming Events section
	startY = addSectionToPDF(
		`Upcoming Events as of ${formattedNow}`,
		upcomingEventsData,
		doc,
		startY
	);

	// Add Done Events section
	startY = addSectionToPDF(
		`Done Events as of ${formattedNow}`,
		doneEventsData,
		doc,
		startY
	);

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
