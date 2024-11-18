import { Response } from "../../../../../../_metronic/helpers";
export type MType = {
	id?: string;
	name?: string;
	status?: string;
	created_at?: string | number | Date | undefined;
};

export type UsersQueryResponse = Response<Array<MType>>;

export const initialMType: MType = {
	name: "",
};
