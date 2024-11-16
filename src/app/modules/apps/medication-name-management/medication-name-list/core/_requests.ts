import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { MNames, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/medtype`;
const GET_USERS_URL = `${API_URL}/medtype`;

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

export {
	getMNames,
	deleteMName,
	deleteSelectedUsers,
	getMNameById,
	createMName,
	updateMName,
};
