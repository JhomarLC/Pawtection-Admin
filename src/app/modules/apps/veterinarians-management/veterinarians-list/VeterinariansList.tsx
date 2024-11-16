import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { VeterinariansListHeader } from "./components/header/VeterinariansListHeader";
import { VeterinariansTable } from "./table/VeterinariansTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { VeterinariansEditModal } from "./veterinarians-edit-modal/VeterinariansEditModal";

const VeterinariansList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<VeterinariansListHeader />
				<VeterinariansTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <VeterinariansEditModal />}
		</>
	);
};

const VeterinariansListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<VeterinariansList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { VeterinariansListWrapper };
