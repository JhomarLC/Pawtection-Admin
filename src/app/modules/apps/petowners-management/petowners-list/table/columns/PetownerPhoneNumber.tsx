import { FC } from "react";

type Props = {
	phone_number?: string;
};

const PetownerPhoneNumber: FC<Props> = ({ phone_number }) => (
	<div className="badge badge-primary fw-bolder">{phone_number}</div>
);

export { PetownerPhoneNumber };
