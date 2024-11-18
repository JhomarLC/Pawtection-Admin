import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
// import { KTIcon } from "../../../../../../../_metronic/helpers";
import { KTIcon, QUERIES } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { deleteMName } from "../../core/_requests";
import { MNames } from "../../core/_models";

type Props = {
	id: string | undefined;
	mnames: MNames;
};

const MedicationsNameActionsCell: FC<Props> = ({ id, mnames }) => {
	const { setItemIdForUpdate } = useListView();
	const { query } = useQueryResponse();
	const queryClient = useQueryClient();

	// State to track whether the delete option should be shown
	const [showDelete, setShowDelete] = useState(false);

	useEffect(() => {
		const checkDeleteVisibility = () => {
			const createdAt = new Date(mnames.created_at);
			const currentTime = new Date();
			const timeDiff =
				(currentTime.getTime() - createdAt.getTime()) / (1000 * 60); // Convert to minutes

			// Show delete option only if the event was created within 10 minutes
			setShowDelete(timeDiff <= 10);
		};

		// Check initially
		checkDeleteVisibility();

		// Set up an interval to check every 1 minute
		const interval = setInterval(checkDeleteVisibility, 60000);

		// Clean up the interval on component unmount
		return () => clearInterval(interval);
	}, [mnames.created_at]);

	useEffect(() => {
		MenuComponent.reinitialization();
	}, [showDelete]);

	const openEditModal = () => {
		setItemIdForUpdate(id);
	};

	const deleteItem = useMutation(() => deleteMName(id), {
		// 💡 response of the mutation is passed to onSuccess
		onSuccess: () => {
			// ✅ update detail view directly
			queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
		},
	});

	return (
		<>
			<button
				className="btn btn-light btn-active-light-primary btn-sm"
				data-kt-menu-trigger="click"
				data-kt-menu-placement="bottom-end"
			>
				Action
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
						Edit Status
					</a>
				</div>
				{/* end::Menu item */}

				{/* begin::Menu item */}
				{showDelete && (
					<div className="menu-item px-3">
						<a
							className="menu-link px-3"
							data-kt-users-table-filter="delete_row"
							onClick={async () => await deleteItem.mutateAsync()}
						>
							Delete
						</a>
					</div>
				)}

				{/* end::Menu item */}
			</div>
			{/* end::Menu */}
		</>
	);
};

export { MedicationsNameActionsCell };
