import { Response } from "../../../../../../_metronic/helpers";

interface Medtype {
	id: number;
	name: string;
	status: string;
	created_at: string;
	updated_at: string;
}

export type MNames = {
	id: number;
	medication_type_id: number;
	name: string;
	status: string;
	created_at: string;
	updated_at: string;
	medtype: Medtype;
};

export type UsersQueryResponse = Response<Array<MNames>>;

export const initialMName: MNames = {
	id: 1,
	name: "",
	status: "",
	medication_type_id: 1,
	created_at: "",
	updated_at: "",
	medtype: {
		id: 1,
		name: "",
		status: "",
		created_at: "",
		updated_at: "",
	},
};
