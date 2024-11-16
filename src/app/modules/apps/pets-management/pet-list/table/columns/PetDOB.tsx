import { FC } from "react";

type Props = {
	dob?: string;
};

const PetDOB: FC<Props> = ({ dob }) => (
	<div className="badge badge-light fw-bolder">{dob}</div>
);

export { PetDOB };
