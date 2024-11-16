import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Event, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/events`;
const GET_USERS_URL = `${API_URL}/events`;
const GET_BY_ADDRESS = `${API_URL}/notification/by-address`;
const PUSH_URL_NOTIF = "https://exp.host/--/api/v2/push/send";

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

export {
	pushNotif,
	getEvents,
	deleteUser,
	deleteSelectedUsers,
	getNotificationTokens,
	getEventById,
	createEvent,
	updateEvent,
};
