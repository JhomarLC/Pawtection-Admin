import { FC } from "react";

type Props = {
	status?: string;
};

const MedicationsTypeStatus: FC<Props> = ({ status }) => {
	// Determine the badge class based on status
	const badgeClass =
		status === "Active"
			? "badge badge-success fw-bolder"
			: "badge badge-danger fw-bolder";

	return <div className={badgeClass}>{status}</div>;
};

export { MedicationsTypeStatus };
