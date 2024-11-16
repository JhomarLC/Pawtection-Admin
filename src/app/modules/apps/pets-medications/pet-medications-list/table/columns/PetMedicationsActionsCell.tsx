import { FC, useEffect } from "react";
// import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import { KTIcon } from "../../../../../../../_metronic/helpers";
// import { KTIcon, QUERIES } from "../../../../../../../_metronic/helpers";
// import { useListView } from "../../core/ListViewProvider";
// import { useQueryResponse } from "../../core/QueryResponseProvider";
// import { deleteUser } from "../../core/_requests";

type Props = {
	id: number | undefined;
};

const PetMedicationsActionsCell: FC<Props> = ({ id }) => {
	// const { setItemIdForUpdate } = useListView();
	// const { query } = useQueryResponse();
	// const queryClient = useQueryClient();

	useEffect(() => {
		MenuComponent.reinitialization();
	}, []);

	// const openEditModal = () => {
	// 	setItemIdForUpdate(id);
	// };

	// const deleteItem = useMutation(() => deleteUser(id), {
	// 	// 💡 response of the mutation is passed to onSuccess
	// 	onSuccess: () => {
	// 		// ✅ update detail view directly
	// 		queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
	// 	},
	// });

	const viewMedications = (id: number | undefined) => {
		if (id) {
			console.log(id);
		} else {
			console.log("No ID provided");
		}
	};

	return (
		<>
			<button
				className="btn btn-light btn-active-light-success btn-sm mx-5"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
				// onClick={() => openEditModal()}
			>
				<KTIcon iconName="eye" className="fs-5 m-0" />
				Photos
			</button>
			<button
				className="btn btn-light btn-active-light-success btn-sm"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
				onClick={() => viewMedications(id)}
			>
				<KTIcon iconName="document" className="fs-5 m-0" />
				Medications
			</button>
		</>
	);
};

export { PetMedicationsActionsCell };
