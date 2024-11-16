import { FC } from "react";
import { Pet } from "../../core/_models";
// import { QRCodeSVG } from "qrcode.react";

type Props = {
	pet: Pet;
};

const PETOWNER_PROFILE_PATH = `${
	import.meta.env.VITE_APP_STORAGE
}/pet_profile/`;

const PetInfoCell: FC<Props> = ({ pet }) => (
	<div className="d-flex align-items-center">
		{/* begin:: Avatar */}
		<div className="symbol symbol-50px overflow-hidden me-3">
			{/* <QRCodeSVG value={pet?.id} /> */}
			<a href="#">
				{pet?.image && (
					<div className="symbol-label">
						<img
							src={PETOWNER_PROFILE_PATH + pet?.image}
							alt={pet.name}
							className="w-100"
						/>
					</div>
				)}
			</a>
		</div>
		<div className="d-flex flex-column">
			<a href="#" className="text-gray-800 text-hover-primary mb-1">
				{pet.name}
			</a>
			<span>{pet.color_description}</span>
		</div>
	</div>
);

export { PetInfoCell };
