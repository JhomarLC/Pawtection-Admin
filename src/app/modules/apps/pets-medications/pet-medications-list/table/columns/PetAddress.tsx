import { FC } from "react";
import { User } from "../../core/_models";

type Props = {
	petowner: User;
};
const PetAddress: FC<Props> = ({ petowner }) => (
	<div className="text-gray-800 text-hover-primary mb-1">
		{petowner?.addr_zone}, {petowner?.addr_brgy}, San Jose City, NE
	</div>
);

export { PetAddress };
