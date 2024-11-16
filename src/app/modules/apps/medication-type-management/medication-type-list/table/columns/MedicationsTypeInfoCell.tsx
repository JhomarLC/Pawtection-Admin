import { FC } from "react";
import { MType } from "../../core/_models";

type Props = {
	mtype: MType;
};

// const PETOWNER_PROFILE_PATH =
// 	"http://127.0.0.1:8000/storage/petowners_profile/";

const MedicationsTypeInfoCell: FC<Props> = ({ mtype }) => (
	<div className="d-flex align-items-center">
		{/* begin:: Avatar */}
		<div className="d-flex flex-column">
			<a href="#" className="text-gray-800 text-hover-primary mb-1">
				{mtype.name}
			</a>
		</div>
	</div>
);

export { MedicationsTypeInfoCell };
