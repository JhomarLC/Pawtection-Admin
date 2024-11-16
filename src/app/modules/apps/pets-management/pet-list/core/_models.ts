import { Response } from "../../../../../../_metronic/helpers";
export type Pet = {
	id?: string | undefined;
	name?: string;
	image?: string;
	breed?: string;
	color_description?: string;
	size?: string;
	weight?: string;
	date_of_birth?: string;
	pet_qr_code?: string;
	status?: string;
	pet_type?: string;
};

export type PetPhotos = {
	id?: string | undefined;
	pet_id?: string | undefined;
	image?: string;
};

export const initialPhotos: PetPhotos = {
	id: "",
	pet_id: "",
	image: "",
};
// $table->string('name', 100);
// $table->string('breed', 100);
// $table->string('color_description', 100);
// $table->string('size', 100);
// $table->float('weight');
// $table->date('date_of_birth');
// $table->string('pet_qr_code');
// $table->enum('status', ['pending', 'approved', 'deceased'])->default('pending');
// $table->enum('pet_type', ['dog', 'cat'])->default('dog');
export type UsersQueryResponse = Response<Array<Pet>>;

export const initialUser: Pet = {
	id: "",
	name: "",
	image: "",
	breed: "",
	color_description: "",
	size: "",
	weight: "",
	date_of_birth: "",
	pet_qr_code: "",
	status: "",
	pet_type: "",
};
