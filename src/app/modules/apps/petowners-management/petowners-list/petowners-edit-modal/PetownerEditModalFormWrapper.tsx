import { useQuery } from "react-query";
import { UserEditModalForm } from "./PetownerEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getUserById } from "../core/_requests";

const PetownerEditModalFormWrapper = () => {
	const { itemIdForUpdate, setItemIdForUpdate } = useListView();
	const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
	const {
		isLoading,
		data: user,
		error,
	} = useQuery(
		`${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
		() => {
			return getUserById(itemIdForUpdate);
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
			<UserEditModalForm
				isUserLoading={isLoading}
				user={{ id: undefined }}
			/>
		);
	}

	if (!isLoading && !error && user) {
		return <UserEditModalForm isUserLoading={isLoading} user={user} />;
	}

	return null;
};

export { PetownerEditModalFormWrapper };
