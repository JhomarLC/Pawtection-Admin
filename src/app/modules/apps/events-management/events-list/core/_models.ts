import { Response } from "../../../../../../_metronic/helpers";
export type Event = {
	id?: string;
	name?: string | undefined;
	date_time?: string | number | Date | undefined;
	place?: string;
	description?: string;
	token?: string;
};

export type UsersQueryResponse = Response<Array<Event>>;

export const initialEvent: Event = {
	id: "",
	name: "",
	date_time: "",
	place: "",
	description: "",
};
