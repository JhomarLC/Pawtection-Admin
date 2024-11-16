import { useQuery } from "react-query";
import { MedicationsTypeEditModalForm } from "./MedicationsTypeEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getMTypeById } from "../core/_requests";

const MedicationsTypeEditModalFormWrapper = () => {
	const { itemIdForUpdate, setItemIdForUpdate } = useListView();
	const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
	const {
		isLoading,
		data: user,
		error,
	} = useQuery(
		`${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
		() => {
			return getMTypeById(itemIdForUpdate);
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
			<MedicationsTypeEditModalForm
				isUserLoading={isLoading}
				mtype={{ id: undefined }}
			/>
		);
	}

	if (!isLoading && !error && user) {
		return (
			<MedicationsTypeEditModalForm
				isUserLoading={isLoading}
				mtype={user}
			/>
		);
	}

	return null;
};

export { MedicationsTypeEditModalFormWrapper };
