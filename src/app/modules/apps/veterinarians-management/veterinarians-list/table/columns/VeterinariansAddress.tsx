import { FC } from "react";
import { User } from "../../core/_models";

type Props = {
	user?: User;
};

const VeterinariansAddress: FC<Props> = ({ user }) => (
	<div className="mb-1">
		Zone {user?.addr_zone}, Brgy.{user?.addr_brgy}
		<br />
		San Jose City, NE
	</div>
);

export { VeterinariansAddress };
