import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { EventsListHeader } from "./components/header/EventsListHeader";
import { MedicationsTypeTable } from "./table/MedicationsTypeTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { MedicationsTypeEditModal } from "./medication-type-edit-modal/MedicationsTypeEditModal";

const MedicationsTypeList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<EventsListHeader />
				<MedicationsTypeTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <MedicationsTypeEditModal />}
		</>
	);
};

const MedicationsTypeListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<MedicationsTypeList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { MedicationsTypeListWrapper };
