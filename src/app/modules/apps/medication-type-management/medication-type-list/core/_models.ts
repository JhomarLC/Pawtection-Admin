import { Response } from "../../../../../../_metronic/helpers";
export type MType = {
	id?: string;
	name?: string;
	status?: string;
};

export type UsersQueryResponse = Response<Array<MType>>;

export const initialMType: MType = {
	name: "",
};
