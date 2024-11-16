import { FC } from "react";

type Props = {
	remarks?: string;
};

const PetMedRemarks: FC<Props> = ({ remarks }) => (
	<div className="badge badge-info fw-bolder">{remarks}</div>
);

export { PetMedRemarks };
