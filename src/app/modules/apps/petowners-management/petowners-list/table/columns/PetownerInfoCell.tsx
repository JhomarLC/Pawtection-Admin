import { FC } from "react";
import { User } from "../../core/_models";

type Props = {
	user: User;
};

const PETOWNER_PROFILE_PATH = `${
	import.meta.env.VITE_APP_STORAGE
}/petowners_profile/`;

const PetownerInfoCell: FC<Props> = ({ user }) => (
	<div className="d-flex align-items-center">
		{/* begin:: Avatar */}
		<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
			<a href="#">
				{user?.image && (
					<div className="symbol-label">
						<img
							src={PETOWNER_PROFILE_PATH + user?.image}
							alt={user.name}
							className="w-100"
						/>
					</div>
				)}
			</a>
		</div>
		<div className="d-flex flex-column">
			<a href="#" className="text-gray-800 text-hover-primary mb-1">
				{user.name}
			</a>
			<span>{user.email}</span>
		</div>
	</div>
);

export { PetownerInfoCell };
