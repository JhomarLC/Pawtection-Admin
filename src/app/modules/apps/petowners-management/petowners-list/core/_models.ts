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
interface MedicationType {
	id: number;
	name: string;
	status: string;
	created_at: string;
	updated_at: string;
}

export type Medication = {
	medication_date: string;
	type: MedicationType;
	name: string;
	batch_number: string;
	or_number: string;
	veterinarian: string;
	expiry: string;
	next_vaccination: string | null;
	fee: number;
	remarks: string;
};

export type Pet = {
	id: string;
	name: string;
	gender: string;
	breed: string;
	color_description: string;
	size: string;
	weight: number;
	date_of_birth: string;
	status: string;
	medications: Medication[];
};

export type PetOwner = {
	id: string;
	name: string;
	email: string;
	phone_number: string;
	addr_zone: string;
	addr_brgy: string;
	pets: Pet[];
};

export type UsersQueryResponse = Response<Array<User>>;

export const initialUser: User = {
	image: "avatars/300-6.jpg",
	name: "",
	email: "",
};
