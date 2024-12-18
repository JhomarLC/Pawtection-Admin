import { FC } from "react";
import { User } from "../../core/_models";

type Props = {
	petowner: User;
};
const PetownerAddress: FC<Props> = ({ petowner }) => (
	<div>
		Zone {petowner?.addr_zone}, Brgy.{petowner?.addr_brgy}, San Jose City,
		NE
	</div>
);

export { PetownerAddress };
