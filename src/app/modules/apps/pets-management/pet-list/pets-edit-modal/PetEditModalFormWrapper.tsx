import { useQuery } from "react-query";
import { PetEditModalForm } from "./PetEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getPetPhotosById } from "../core/_requests";
import { useParams } from "react-router-dom";

const PetEditModalFormWrapper = () => {
	const { petOwnerId } = useParams<{ petOwnerId: string }>();
	const { itemIdForUpdate, setItemIdForUpdate } = useListView();
	const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
	const {
		isLoading,
		data: petphotos,
		error,
	} = useQuery(
		`${QUERIES.USERS_LIST}-user-${itemIdForUpdate}`,
		() => {
			return getPetPhotosById(petOwnerId, itemIdForUpdate);
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
	console.log(petphotos);

	if (!itemIdForUpdate) {
		return (
			<PetEditModalForm
				isUserLoading={isLoading}
				petphotos={[{ id: undefined }]}
			/>
		);
	}

	if (!isLoading && !error && petphotos) {
		return (
			<PetEditModalForm
				isUserLoading={isLoading}
				petphotos={Array.isArray(petphotos) ? petphotos : [petphotos]}
			/>
		);
	}

	return null;
};

export { PetEditModalFormWrapper };
