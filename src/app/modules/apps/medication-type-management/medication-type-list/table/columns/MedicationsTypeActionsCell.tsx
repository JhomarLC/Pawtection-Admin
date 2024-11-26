import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
import { KTIcon, QUERIES } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { deleteMType } from "../../core/_requests";
import { useNavigate } from "react-router-dom";
import { MType } from "../../core/_models";
import { AlertModal } from "../../../../../../../_metronic/partials/modals/AlertModal";

type Props = {
	id: string | undefined;
	mtype: MType;
};

const MedicationsTypeActionsCell: FC<Props> = ({ id, mtype }) => {
	const navigate = useNavigate();

	const { setItemIdForUpdate } = useListView();
	const { query } = useQueryResponse();
	const queryClient = useQueryClient();

	// State to track whether the delete option should be shown
	const [showDelete, setShowDelete] = useState(false);

	const [alertVisible, setAlertVisible] = useState(false);
	const [alertAction, setAlertAction] = useState<(() => void) | null>(null);
	const [message, setMessage] = useState("");
	const [modalTitle, setModalTitle] = useState("");
	const [alertType, setAlertType] = useState<
		"danger" | "warning" | "primary" | "success"
	>("danger");

	const handleShowAlert = (
		type: "danger" | "warning" | "primary" | "success",
		title: string,
		message: string,
		action?: () => void // Op
	) => {
		setAlertType(type);
		setModalTitle(title);
		setMessage(message);
		// Optionally set the action to a state variable
		if (action) {
			setAlertAction(() => action); // Store the action in a state variable
		}
		setAlertVisible(true);
	};

	const handleCloseAlert = () => {
		setAlertVisible(false);
	};

	useEffect(() => {
		// Function to check and update the delete visibility
		const checkDeleteVisibility = () => {
			const createdAt = new Date(mtype.created_at);
			const currentTime = new Date();
			const timeDiff =
				(currentTime.getTime() - createdAt.getTime()) / (1000 * 60); // Convert to minutes

			// Update the state based on the time difference
			setShowDelete(timeDiff <= 10);
		};

		// Initial check
		checkDeleteVisibility();

		// Set up an interval to check every 1 minute
		const interval = setInterval(checkDeleteVisibility, 60000);

		// Clean up the interval on component unmount
		return () => clearInterval(interval);
	}, [mtype.created_at]);

	useEffect(() => {
		// Reinitialize the menu whenever the component updates
		MenuComponent.reinitialization();
	}, [showDelete]);

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
			<AlertModal
				type={alertType} // Dynamically sets the alert type
				title={modalTitle}
				message={message}
				show={alertVisible}
				onClose={handleCloseAlert}
				onCancel={() => {
					handleCloseAlert();
				}}
				onConfirm={() => {
					if (alertAction) alertAction(); // Execute the stored action
					handleCloseAlert();
				}}
			/>
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
							onClick={() =>
								handleShowAlert(
									"danger",
									"Warning",
									"Are you sure you want to delete this Medication Type?",
									async () => {
										await deleteItem.mutateAsync();
									}
								)
							}
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

export { MedicationsTypeActionsCell };
