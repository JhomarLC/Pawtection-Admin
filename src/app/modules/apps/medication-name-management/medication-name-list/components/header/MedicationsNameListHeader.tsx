import { useListView } from "../../core/ListViewProvider";
import { MedicationsNameListToolbar } from "./MedicationsNameListToolbar";
import { MedicationsNameListGrouping } from "./MedicationsNameListGrouping";
import { MedicationsNameListSearchComponent } from "./MedicationsNameListSearchComponent";

const MedicationsNameListHeader = () => {
	const { selected } = useListView();
	return (
		<div className="card-header border-0 pt-6">
			<MedicationsNameListSearchComponent />
			{/* begin::Card toolbar */}
			<div className="card-toolbar">
				{/* begin::Group actions */}
				{selected.length > 0 ? (
					<MedicationsNameListGrouping />
				) : (
					<MedicationsNameListToolbar />
				)}
				{/* end::Group actions */}
			</div>
			{/* end::Card toolbar */}
		</div>
	);
};

export { MedicationsNameListHeader };
