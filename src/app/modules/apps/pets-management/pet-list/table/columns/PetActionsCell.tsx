import { FC, useEffect } from "react";
// import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import { KTIcon } from "../../../../../../../_metronic/helpers";
// import { KTIcon, QUERIES } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useNavigate } from "react-router-dom";
// import { useQueryResponse } from "../../core/QueryResponseProvider";
// import { deleteUser } from "../../core/_requests";

type Props = {
	id: string | undefined;
};

const PetActionsCell: FC<Props> = ({ id }) => {
	const navigate = useNavigate();

	const { setItemIdForUpdate } = useListView();
	// const { query } = useQueryResponse();
	// const queryClient = useQueryClient();

	useEffect(() => {
		MenuComponent.reinitialization();
	}, []);

	const openEditModal = () => {
		setItemIdForUpdate(id);
	};

	const viewMedications = (id: string | undefined) => {
		if (id) {
			navigate(`/petowners/pets/${id}/medications`);
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
				onClick={() => openEditModal()}
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
				Health Record
			</button>
		</>
	);
};

export { PetActionsCell };
