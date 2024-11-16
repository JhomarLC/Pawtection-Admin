import { ListViewProvider, useListView } from "./core/ListViewProvider";
import { QueryRequestProvider } from "./core/QueryRequestProvider";
import { QueryResponseProvider } from "./core/QueryResponseProvider";
import { MedicationsNameListHeader } from "./components/header/MedicationsNameListHeader";
import { MedicationsNameTable } from "./table/MedicationsNameTable";
import { KTCard } from "../../../../../_metronic/helpers";
import { MedicationsNameEditModal } from "./medication-name-edit-modal/MedicationsNameEditModal";

const MedicationsNameList = () => {
	const { itemIdForUpdate } = useListView();
	return (
		<>
			<KTCard>
				<MedicationsNameListHeader />
				<MedicationsNameTable />
			</KTCard>
			{itemIdForUpdate !== undefined && <MedicationsNameEditModal />}
		</>
	);
};

const MedicationsNameListWrapper = () => (
	<QueryRequestProvider>
		<QueryResponseProvider>
			<ListViewProvider>
				<MedicationsNameList />
			</ListViewProvider>
		</QueryResponseProvider>
	</QueryRequestProvider>
);

export { MedicationsNameListWrapper };
