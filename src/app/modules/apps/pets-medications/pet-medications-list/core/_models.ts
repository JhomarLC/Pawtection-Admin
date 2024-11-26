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
export type Veterinarian = {
	name?: string;
};

export type MedicationName = {
	name?: string;
	medication_type_id?: number;
	medtype?: MedicationType;
};

export type MedicationType = {
	name?: string;
};

export type PetMed = {
	id?: number;
	medication_date?: string;
	expiry_date?: string;
	next_vaccination?: string | undefined;
	batch_number?: string;
	or_number?: string;
	fee?: number;
	remarks?: string;
	veterinarian?: Veterinarian;
	medicationname?: MedicationName;
};

// {
//     "id": 27,
//     "or_number": "Registered",
//     "batch_number": "50",
//     "fee": 0,
//     "expiry_date": "2024-12-20",
//     "next_vaccination": null,
//     "medication_date": "2024-11-16",
//     "remarks": "Mass",
//     "created_at": "2024-11-16T15:43:41.000000Z",
//     "updated_at": "2024-11-16T15:43:41.000000Z",
//     "pet": {
//         "id": "9d7c3aaf-61fe-471d-837b-eebea049c233",
//         "name": "Hshs",
//         "image": "1731568860_pet.png",
//         "breed": "Aspin (Philippine Native)",
//         "gender": "Male",
//         "color_description": "hahaha",
//         "weight": 7,
//         "size": "Medium",
//         "date_of_birth": "2024-11-14",
//         "age": "2 days old",
//         "status": "approved",
//         "pet_type": "dog"
//     },
//     "veterinarian": {
//         "id": "9d782ffc-c8d3-4b7d-8c1d-2aafb7d05002",
//         "name": "Jhomar Candelario",
//         "email": "candelario.jhomar@clsu2.edu.ph",
//         "image": "1731395267_vet.jpeg",
//         "email_verified_at": null,
//         "position": "Head Veterinarian",
//         "license_number": "1234567",
//         "phone_number": "09982369196",
//         "electronic_signature": "1731395267_esignature.jpeg",
//         "status": "approved",
//         "created_at": "2024-11-12T07:07:47.000000Z",
//         "updated_at": "2024-11-14T09:05:48.000000Z"
//     },
//     "medicationname": {
//         "id": 2,
//         "medication_type_id": 1,
//         "name": "Parvoviridae",
//         "status": "Active",
//         "created_at": "2024-11-12T07:04:50.000000Z",
//         "updated_at": "2024-11-12T07:04:50.000000Z"
//     }
// }
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
