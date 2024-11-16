import { useListView } from "../../core/ListViewProvider";
import { PetMedicationsListToolbar } from "./PetMedicationsListToolbar";
import { PetMedicationsListSearchComponent } from "./PetMedicationsListSearchComponent";
import { PetMedicationsListGrouping } from "./PetMedicationsListGrouping";

const PetMedicationsListHeader = () => {
	const { selected } = useListView();
	return (
		<div className="card-header border-0 pt-6">
			<PetMedicationsListSearchComponent />
			{/* begin::Card toolbar */}
			<div className="card-toolbar">
				{/* begin::Group actions */}
				{selected.length > 0 ? (
					<PetMedicationsListGrouping />
				) : (
					<PetMedicationsListToolbar />
				)}
				{/* end::Group actions */}
			</div>
			{/* end::Card toolbar */}
		</div>
	);
};

export { PetMedicationsListHeader };
