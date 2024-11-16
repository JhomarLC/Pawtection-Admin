import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { PetMedicationsListHeader } from "./components/header/PetMedicationsListHeader";
import { PetMedicationsTable } from "./table/PetMedicationsTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { PetEditModal } from "./pet-medications-edit-modal/PetEditModal";

const PetMedicationsList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<PetMedicationsListHeader />
				<PetMedicationsTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <PetEditModal />}
		</>
	);
};

const PetListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<PetMedicationsList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { PetListWrapper };
