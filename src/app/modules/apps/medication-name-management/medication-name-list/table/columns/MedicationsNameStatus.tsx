import { FC } from "react";

type Props = {
	status?: string;
};

const MedicationsNameStatus: FC<Props> = ({ status }) => {
	const badgeClass =
		status === "Active"
			? "badge badge-success fw-bolder"
			: "badge badge-danger fw-bolder";

	return <div className={badgeClass}>{status}</div>;
};

export { MedicationsNameStatus };
