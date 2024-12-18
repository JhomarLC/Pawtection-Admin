import { useListView } from "../../core/ListViewProvider";
import { PetownersListGrouping } from "./PetownersListGrouping";
import { PetownersListSearchComponent } from "./PetownersListSearchComponent";
import { PetownersListToolbar } from "./PetownersListToolbar";

const PetownersListHeader = () => {
	const { selected } = useListView();
	return (
		<div className="card-header border-0 pt-6">
			<PetownersListSearchComponent />
			{/* begin::Card toolbar */}
			<div className="card-toolbar">
				{/* begin::Group actions */}
				{selected.length > 0 ? (
					<PetownersListGrouping />
				) : (
					<PetownersListToolbar />
				)}
				{/* end::Group actions */}
			</div>
			{/* end::Card toolbar */}
		</div>
	);
};

export { PetownersListHeader };
