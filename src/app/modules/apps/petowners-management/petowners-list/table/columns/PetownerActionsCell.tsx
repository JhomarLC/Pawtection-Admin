import { FC, useEffect } from "react";
// import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import { KTIcon } from "../../../../../../../_metronic/helpers";
// import { KTIcon, QUERIES } from "../../../../../../../_metronic/helpers";
// import { useListView } from "../../core/ListViewProvider";
// import { useQueryResponse } from "../../core/QueryResponseProvider";
// import { deleteUser } from "../../core/_requests";
import { useNavigate } from "react-router-dom";

type Props = {
	id: string | undefined;
};

const PetownerActionsCell: FC<Props> = ({ id }) => {
	const navigate = useNavigate();

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

	const viewPets = (id: string | undefined) => {
		if (id) {
			navigate(`/petowners/${id}/pets`);
		} else {
			console.log("No ID provided");
		}
	};

	return (
		<>
			<button
				className="btn btn-light btn-active-light-primary btn-sm"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
				onClick={() => viewPets(id)}
			>
				<KTIcon iconName="eye" className="fs-5 m-0" />
				View Pets
			</button>
		</>
	);
};

export { PetownerActionsCell };
