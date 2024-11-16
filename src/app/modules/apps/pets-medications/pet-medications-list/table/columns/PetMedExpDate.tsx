import { FC } from "react";

type Props = {
	exp_date?: string | undefined;
};

const formatToLongDate = (dateString: string): string => {
	const formattedInput = dateString.replace(/-/g, "/");
	const date = new Date(formattedInput);

	// Check if the date is valid
	if (isNaN(date.getTime())) {
		throw new Error("Invalid Date");
	}

	// Format the date into "Month Day, Year"
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
};

const PetMedExpDate: FC<Props> = ({ exp_date }) => (
	<div className="fw-bolder">{formatToLongDate(exp_date)}</div>
);

export { PetMedExpDate };
