import { FC } from "react";

type Props = {
	status?: string;
};

const VeterinariansStatus: FC<Props> = ({ status }) => (
	<>
		{status == "approved" && (
			<div className="badge badge-success fw-bolder">{status}</div>
		)}
		{status == "pending" && (
			<div className="badge badge-danger fw-bolder">{status}</div>
		)}
		{status == "declined" && (
			<div className="badge badge-danger fw-bolder">{status}</div>
		)}
		{status == "archived" && (
			<div className="badge badge-light fw-bolder">{status}</div>
		)}
	</>
);

export { VeterinariansStatus };
