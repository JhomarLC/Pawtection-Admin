import { FC } from "react";
import { PetMed } from "../../core/_models";
// import { QRCodeSVG } from "qrcode.react";

type Props = {
	petmed: PetMed;
};

// const PETOWNER_PROFILE_PATH = `${
// 	import.meta.env.VITE_APP_STORAGE
// }/pet_profile/`;

const PetMedicationsInfoCell: FC<Props> = ({ petmed }) => (
	<div className="d-flex align-items-center">
		<div className="d-flex flex-column">
			<a href="#" className="text-gray-800 text-hover-primary mb-1">
				{petmed.medicationname?.name}
			</a>
			<span>{petmed?.medication_date}</span>
		</div>
	</div>
);

export { PetMedicationsInfoCell };
