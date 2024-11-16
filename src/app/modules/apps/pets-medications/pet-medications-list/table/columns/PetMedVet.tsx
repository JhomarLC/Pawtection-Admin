import { FC } from "react";

type Props = {
	name?: string;
};

const PetMedVet: FC<Props> = ({ name }) => (
	<div className="fw-bolder">{name}</div>
);

export { PetMedVet };
