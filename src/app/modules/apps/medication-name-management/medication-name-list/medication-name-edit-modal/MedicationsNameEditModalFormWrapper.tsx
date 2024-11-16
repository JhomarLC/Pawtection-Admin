import { useQuery } from "react-query";
import { MedicationsNameEditModalForm } from "./MedicationsNameEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getMNameById } from "../core/_requests";
import { useParams } from "react-router-dom";

const MedicationsNameEditModalFormWrapper = () => {
	const { medtypeId } = useParams<{ medtypeId: string }>();

	const { itemIdForUpdate, setItemIdForUpdate } = useListView();
	const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
	const {
		isLoading,
		data: mname,
		error,
	} = useQuery(
		`${QUERIES.USERS_LIST}-mname-${itemIdForUpdate}`,
		() => {
			return getMNameById(medtypeId, itemIdForUpdate);
		},
		{
			cacheTime: 0,
			enabled: enabledQuery,
			onError: (err) => {
				setItemIdForUpdate(undefined);
				console.error(err);
			},
		}
	);

	if (!itemIdForUpdate) {
		return (
			<MedicationsNameEditModalForm
				isUserLoading={isLoading}
				mnames={{ id: undefined }}
			/>
		);
	}

	if (!isLoading && !error && mname) {
		return (
			<MedicationsNameEditModalForm
				isUserLoading={isLoading}
				mnames={mname}
			/>
		);
	}

	return null;
};

export { MedicationsNameEditModalFormWrapper };
