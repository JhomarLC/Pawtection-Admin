import { useEffect } from "react";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import PetownersExport from "./PetownersExport";
import { PetownersListFilter } from "./PetownersListFilter";

const PetownersListToolbar = () => {
	useEffect(() => {
		MenuComponent.reinitialization2();
		MenuComponent.reinitialization();
	}, []);
	return (
		<div
			className="d-flex justify-content-end"
			data-kt-user-table-toolbar="base"
		>
			<PetownersListFilter />
			<PetownersExport />
		</div>
	);
};

export { PetownersListToolbar };
