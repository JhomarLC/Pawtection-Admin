import { FC, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import { KTIcon, QUERIES } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { deleteMType } from "../../core/_requests";
import { useNavigate } from "react-router-dom";

type Props = {
	id: string | undefined;
};

const MedicationsTypeActionsCell: FC<Props> = ({ id }) => {
	const navigate = useNavigate();

	const { setItemIdForUpdate } = useListView();
	const { query } = useQueryResponse();
	const queryClient = useQueryClient();

	useEffect(() => {
		MenuComponent.reinitialization();
	}, []);

	const openEditModal = () => {
		setItemIdForUpdate(id);
	};

	const deleteItem = useMutation(() => deleteMType(id), {
		// 💡 response of the mutation is passed to onSuccess
		onSuccess: () => {
			// ✅ update detail view directly
			queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
		},
	});

	const viewMedName = (id: string | undefined) => {
		if (id) {
			navigate(`/medications-type/${id}/medication-names`);
		} else {
			console.log("No ID provided");
		}
	};

	return (
		<>
			<button
				className="btn btn-light btn-active-light-primary btn-sm mx-3"
				onClick={() => viewMedName(id)}
			>
				<KTIcon iconName="eye" className="fs-5 m-0" />
				Medications Name
			</button>
			<button
				className="btn btn-light btn-active-light-primary btn-sm"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
			>
				Actions
				<KTIcon iconName="down" className="fs-5 m-0" />
			</button>
			{/* begin::Menu */}
			<div
				className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
				data-kt-menu="true"
			>
				{/* begin::Menu item */}
				<div className="menu-item px-3">
					<a className="menu-link px-3" onClick={openEditModal}>
						Edit
					</a>
				</div>
				{/* end::Menu item */}

				{/* begin::Menu item */}
				<div className="menu-item px-3">
					<a
						className="menu-link px-3"
						data-kt-users-table-filter="delete_row"
						onClick={async () => await deleteItem.mutateAsync()}
					>
						Delete
					</a>
				</div>
				{/* end::Menu item */}
			</div>
			{/* end::Menu */}
		</>
	);
};

export { MedicationsTypeActionsCell };
