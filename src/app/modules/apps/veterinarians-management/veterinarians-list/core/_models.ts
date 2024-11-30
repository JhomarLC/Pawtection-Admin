import { Response } from "../../../../../../_metronic/helpers";
export type User = {
	id: string;
	name?: string;
	image?: string;
	email?: string;
	position?: string;
	license_number?: string;
	status?: string;
	phone_number?: string;
	role?: string;
	last_login?: string;
	two_steps?: boolean;
	joined_day?: string;
	online?: boolean;
	initials?: {
		label: string;
		state: string;
	};
};

export type UsersQueryResponse = Response<Array<User>>;

export const initialUser: User = {
	id: "32423",
	image: "avatars/300-6.jpg",
	position: "Art Director",
	role: "Administrator",
	name: "",
	email: "",
};
