import { FC } from "react";
import { MNames } from "../../core/_models";

type Props = {
	mnames: MNames;
};

const PETOWNER_PROFILE_PATH =
	"http://127.0.0.1:8000/storage/petowners_profile/";

const MedicationsNameInfoCell: FC<Props> = ({ mnames }) => (
	<div className="d-flex align-items-center">
		{/* begin:: Avatar */}
		<div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
			<a href="#">
				{mnames?.image && (
					<div className="symbol-label">
						<img
							src={PETOWNER_PROFILE_PATH + mnames?.image}
							alt={mnames.name}
							className="w-100"
						/>
					</div>
				)}
			</a>
		</div>
		<div className="d-flex flex-column">
			<a href="#" className="text-gray-800 text-hover-primary mb-1">
				{mnames.name}
			</a>
			{/* <span>{}</span> */}
		</div>
	</div>
);

export { MedicationsNameInfoCell };
