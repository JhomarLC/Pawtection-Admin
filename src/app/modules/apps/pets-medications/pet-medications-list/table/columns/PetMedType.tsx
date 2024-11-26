import { FC } from "react";

type Props = {
	medtype?: string;
};

const PetMedType: FC<Props> = ({ medtype }) => (
	<div className="fw-bolder">{medtype}</div>
);

export { PetMedType };
