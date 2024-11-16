import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { EventsListHeader } from "./components/header/EventsListHeader";
import { EventsTable } from "./table/EventsTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { EventEditModal } from "./events-edit-modal/EventEditModal";

const PetownersList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<EventsListHeader />
				<EventsTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <EventEditModal />}
		</>
	);
};

const PetownersListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<PetownersList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { PetownersListWrapper };
