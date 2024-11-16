import { Response } from "../../../../../../_metronic/helpers";
export type MNames = {
	id?: string;
	name?: string;
	status?: string;
};

export type UsersQueryResponse = Response<Array<MNames>>;

export const initialMName: MNames = {
	name: "",
	status: "",
};
