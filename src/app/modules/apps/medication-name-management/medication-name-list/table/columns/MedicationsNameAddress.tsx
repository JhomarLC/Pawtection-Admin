import { FC } from "react";

type Props = {
	status: string;
};
const MedicationsNameAddress: FC<Props> = ({ status }) => (
	<div className="text-gray-800 text-hover-primary mb-1">{status}</div>
);

export { MedicationsNameAddress };
