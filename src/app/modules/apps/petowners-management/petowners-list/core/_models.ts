import { Response } from "../../../../../../_metronic/helpers";
export type User = {
	id?: string;
	name?: string;
	email?: string;
	image?: string;
	addr_zone?: string;
	addr_brgy?: string;
	phone_number?: string;
};

export type UsersQueryResponse = Response<Array<User>>;

export const initialUser: User = {
	image: "avatars/300-6.jpg",
	name: "",
	email: "",
};
