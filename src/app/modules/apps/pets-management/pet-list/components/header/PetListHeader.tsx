import { useListView } from "../../core/ListViewProvider";
import { PetListToolbar } from "./PetListToolbar";
import { PetListSearchComponent } from "./PetListSearchComponent";
import { PetsListGrouping } from "./PetListGrouping";

const PetListHeader = () => {
	const { selected } = useListView();
	return (
		<div className="card-header border-0 pt-6">
			<PetListSearchComponent />
			{/* begin::Card toolbar */}
			<div className="card-toolbar">
				{/* begin::Group actions */}
				{selected.length > 0 ? (
					<PetsListGrouping />
				) : (
					<PetListToolbar />
				)}
				{/* end::Group actions */}
			</div>
			{/* end::Card toolbar */}
		</div>
	);
};

export { PetListHeader };
