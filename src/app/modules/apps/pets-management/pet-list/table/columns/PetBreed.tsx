import { FC } from "react";

type Props = {
	breed?: string;
};

const PetBreed: FC<Props> = ({ breed }) => (
	<div className="badge badge-primary fw-bolder">{breed}</div>
);

export { PetBreed };
