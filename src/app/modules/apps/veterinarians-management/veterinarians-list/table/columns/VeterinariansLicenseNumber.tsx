import { FC } from "react";

type Props = {
	license_number?: string;
};

const VeterinariansLicenseNumber: FC<Props> = ({ license_number }) => (
	<div className="badge badge-light fw-bolder">{license_number}</div>
);

export { VeterinariansLicenseNumber };
