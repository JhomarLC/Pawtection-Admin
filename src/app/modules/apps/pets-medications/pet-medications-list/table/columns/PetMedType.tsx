import { FC } from "react";

type Props = {
	medtype?: number;
};

const PetMedType: FC<Props> = ({ medtype }) => (
	<div className="fw-bolder">{medtype}</div>
);

export { PetMedType };
