import { FC } from "react";

type Props = {
	petstatus?: string;
};

const PetStatus: FC<Props> = ({ petstatus }) => {
	const getBadgeClass = () => {
		switch (petstatus?.toLowerCase()) {
			case "pending":
				return "badge badge-warning"; // yellow
			case "deceased":
				return "badge badge-dark"; // dark/black
			case "approved":
				return "badge badge-success"; // green
			default:
				return "badge badge-secondary"; // default gray
		}
	};

	return (
		<div className={`badge ${getBadgeClass()} fw-bolder`}>{petstatus}</div>
	);
};

export { PetStatus };
