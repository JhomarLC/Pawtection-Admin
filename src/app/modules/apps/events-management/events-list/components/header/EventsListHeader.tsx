import { useListView } from "../../core/ListViewProvider";
import { EventsListToolbar } from "./EventsListToolbar";
import { EventsListGrouping } from "./EventsListGrouping";
import { EventsListSearchComponent } from "./EventsListSearchComponent";

const EventsListHeader = () => {
	const { selected } = useListView();
	return (
		<div className="card-header border-0 pt-6">
			<EventsListSearchComponent />
			{/* begin::Card toolbar */}
			<div className="card-toolbar">
				{/* begin::Group actions */}
				{selected.length > 0 ? (
					<EventsListGrouping />
				) : (
					<EventsListToolbar />
				)}
				{/* end::Group actions */}
			</div>
			{/* end::Card toolbar */}
		</div>
	);
};

export { EventsListHeader };
