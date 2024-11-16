import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { PetListHeader } from "./components/header/PetListHeader";
import { PetownerTable } from "./table/PetTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { PetEditModal } from "./pets-edit-modal/PetEditModal";

const PetList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<PetListHeader />
				<PetownerTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <PetEditModal />}
		</>
	);
};

const PetListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<PetList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { PetListWrapper };
