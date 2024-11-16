import { useQuery } from "react-query";
import { EventEditModalForm } from "./EventEditModalForm";
import { isNotEmpty, QUERIES } from "../../../../../../_metronic/helpers";
import { useListView } from "../core/ListViewProvider";
import { getEventById } from "../core/_requests";

const EventEditModalFormWrapper = () => {
	const { itemIdForUpdate, setItemIdForUpdate } = useListView();
	const enabledQuery: boolean = isNotEmpty(itemIdForUpdate);
	const {
		isLoading,
		data: event,
		error,
	} = useQuery(
		`${QUERIES.USERS_LIST}-event-${itemIdForUpdate}`,
		() => {
			return getEventById(itemIdForUpdate);
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
			<EventEditModalForm
				isUserLoading={isLoading}
				event={{ id: undefined }}
			/>
		);
	}

	if (!isLoading && !error && event) {
		return <EventEditModalForm isUserLoading={isLoading} event={event} />;
	}

	return null;
};

export { EventEditModalFormWrapper };
