// import { useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { Pet, UsersQueryResponse } from "./_models";

const API_URL = import.meta.env.VITE_APP_THEME_API_URL;
const USER_URL = `${API_URL}/petowners`;
const GET_USERS_URL = `${API_URL}/petowners`;

const getPets = (
	petOwnderId: string | undefined,
	query: string
): Promise<UsersQueryResponse> => {
	return axios
		.get(`${GET_USERS_URL}/${petOwnderId}/pets?${query}`)
		.then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const getPetById = (
	petOwnderId: string | undefined,
	id: ID
): Promise<Pet | undefined> => {
	return axios
		.get(`${USER_URL}/${petOwnderId}/pets/${id}`)
		.then((response: AxiosResponse<Response<Pet>>) => response.data)
		.then((response: Response<Pet>) => response.data);
};

const getPetPhotosById = (
	petOwnderId: string | undefined,
	id: ID
): Promise<Pet | undefined> => {
	return axios
		.get(`${USER_URL}/${petOwnderId}/pets/${id}/getphotos`)
		.then((response: AxiosResponse<Response<Pet>>) => response.data)
		.then((response: Response<Pet>) => response.data);
};

const createUser = (user: Pet): Promise<Pet | undefined> => {
	return axios
		.put(USER_URL, user)
		.then((response: AxiosResponse<Response<Pet>>) => response.data)
		.then((response: Response<Pet>) => response.data);
};

const updateUser = (user: Pet): Promise<Pet | undefined> => {
	return axios
		.post(`${USER_URL}/${user.id}`, user)
		.then((response: AxiosResponse<Response<Pet>>) => response.data)
		.then((response: Response<Pet>) => response.data);
};

const deleteUser = (userId: ID): Promise<void> => {
	return axios.delete(`${USER_URL}/${userId}`).then(() => {});
};

const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
	const requests = userIds.map((id) => axios.delete(`${USER_URL}/${id}`));
	return axios.all(requests).then(() => {});
};

export {
	getPets,
	deleteUser,
	deleteSelectedUsers,
	getPetById,
	createUser,
	updateUser,
	getPetPhotosById,
};
