import { useIntl } from "react-intl";
import { AsideMenuItem } from "./AsideMenuItem";

export function AsideMenuMain() {
	const intl = useIntl();

	return (
		<>
			<AsideMenuItem
				to="/dashboard"
				icon="element-11"
				title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
			/>
			<AsideMenuItem
				to="/veterinarians"
				icon="pulse"
				title="Veterinarians"
			/>
			<AsideMenuItem
				to="/petowners"
				icon="profile-circle"
				title="Pet Owners"
			/>
			<AsideMenuItem
				to="/medications-type"
				icon="syringe"
				title="Medications Type"
			/>

			<AsideMenuItem to="/events" icon="calendar" title="Events" />
		</>
	);
}
