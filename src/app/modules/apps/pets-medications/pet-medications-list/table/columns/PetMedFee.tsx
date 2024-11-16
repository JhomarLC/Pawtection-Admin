import { FC } from "react";

type Props = {
	fee?: number;
};

const PetMedFee: FC<Props> = ({ fee }) => (
	<div className="badge badge-success fw-bolder">PHP {fee}</div>
);

export { PetMedFee };
