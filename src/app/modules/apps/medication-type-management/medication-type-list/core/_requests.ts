import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { MType, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/medtype`;
const GET_USERS_URL = `${API_URL}/medtype`;

const getUsers = (query: string): Promise<UsersQueryResponse> => {
	return axios
		.get(`${GET_USERS_URL}?${query}`)
		.then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getMTypeById = (id: ID): Promise<MType | undefined> => {
	return axios
		.get(`${USER_URL}/${id}`)
		.then((response: AxiosResponse<Response<MType>>) => response.data)
		.then((response: Response<MType>) => response.data);
};

const createMType = (medtype: MType): Promise<MType | undefined> => {
	return axios
		.post(USER_URL, medtype)
		.then((response: AxiosResponse<Response<MType>>) => response.data)
		.then((response: Response<MType>) => response.data);
};

const updateMtype = (medtype: MType): Promise<MType | undefined> => {
	return axios
		.put(`${USER_URL}/${medtype.id}`, medtype)
		.then((response: AxiosResponse<Response<MType>>) => response.data)
		.then((response: Response<MType>) => response.data);
};

const deleteMType = (mtypeID: ID): Promise<void> => {
	return axios.delete(`${USER_URL}/${mtypeID}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
	const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
	return axios.all(requests).then(() => {});
};

export {
	getUsers,
	deleteMType,
	deleteSelectedUsers,
	getMTypeById,
	createMType,
	updateMtype,
};
