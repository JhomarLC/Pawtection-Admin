import { FC } from "react";

type Props = {
	next_vacc?: string | null; // Handle undefined or null explicitly
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

const PetMedNextDate: FC<Props> = ({ next_vacc }) => (
	<div className="fw-bolder">
		{next_vacc ? formatToLongDate(next_vacc) : "None"}
	</div>
);

export { PetMedNextDate };
