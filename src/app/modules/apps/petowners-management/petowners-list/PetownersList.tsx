import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { PetownersListHeader } from "./components/header/PetownersListHeader";
import { PetownerTable } from "./table/PetownersTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { PetownerEditModal } from "./petowners-edit-modal/PetownerEditModal";

const PetownersList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<PetownersListHeader />
				<PetownerTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <PetownerEditModal />}
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
