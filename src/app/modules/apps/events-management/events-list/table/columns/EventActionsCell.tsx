import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { MenuComponent } from "../../../../../../../_metronic/assets/ts/components";
// import { KTIcon } from "../../../../../../../_metronic/helpers";
import { KTIcon, QUERIES } from "../../../../../../../_metronic/helpers";
import { useListView } from "../../core/ListViewProvider";
import { useQueryResponse } from "../../core/QueryResponseProvider";
import { deleteUser, getNotificationTokens } from "../../core/_requests";
import { Event } from "../../core/_models";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

type Props = {
	id: string | undefined;
	event: Event;
};

type Notif = {
	to?: string;
	title?: string | undefined;
	body?: string;
};
const EventActionsCell: FC<Props> = ({ id, event }) => {
	// const navigate = useNavigate();

	const { setItemIdForUpdate } = useListView();
	const { query } = useQueryResponse();
	const queryClient = useQueryClient();

	// State to track whether the delete option should be shown
	const [showDelete, setShowDelete] = useState(false);

	// Check if date_time is defined and create a Date object
	const eventDateTime = event.date_time ? new Date(event.date_time) : null;
	const currentDateTime = new Date();

	// Determine the event status (upcoming or done)
	const status =
		eventDateTime && eventDateTime.getTime() > currentDateTime.getTime()
			? "Upcoming"
			: "Done";

	useEffect(() => {
		const checkDeleteVisibility = () => {
			const createdAt = new Date(event.created_at);
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
	}, [event.created_at]);

	useEffect(() => {
		// Reinitialize the menu whenever the component updates
		MenuComponent.reinitialization();
	}, [showDelete]);

	const openEditModal = () => {
		setItemIdForUpdate(id);
	};

	const deleteItem = useMutation(() => deleteUser(id), {
		// 💡 response of the mutation is passed to onSuccess
		onSuccess: () => {
			// ✅ update detail view directly
			queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
		},
	});
	const handleNotifyPetOwners = async () => {
		// Show confirmation dialog
		const confirmation = window.confirm(
			"Are you sure you want to notify all pet owners about this event?"
		);

		if (!confirmation) {
			console.log("Notification canceled by user.");
			return; // Exit if the user cancels
		}

		try {
			const res = await getNotificationTokens("");

			if (res && res.data) {
				for (const user of res.data) {
					const notification: Notif = {
						to: user.token,
						title: "Attention for Upcoming Event",
						body: `Event "${event.name}" is scheduled at ${event.place} on ${event.date_time}.`,
					};
					// Send the notification using axios
					await axios.post(
						"http://192.168.100.86:8080/api/send-notif",
						notification,
						{
							headers: {
								Accept: "application/json",
								"Accept-encoding": "gzip, deflate",
								"Content-Type": "application/json",
							},
						}
					);
					console.log(
						`Notification sent to token: ${notification.to}`
					);
				}
			} else {
				console.log("No tokens found in response.");
			}
		} catch (error) {
			console.error("Error sending notifications:", error);
		}
	};

	return (
		<>
			{status === "Upcoming" && (
				<>
					{/* Action Button */}
					<button
						className="btn btn-light btn-active-light-primary btn-sm"
						data-kt-menu-trigger="click"
						data-kt-menu-placement="bottom-end"
					>
						Action
						<KTIcon iconName="down" className="fs-5 m-0" />
					</button>

					{/* Menu */}
					<div
						className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
						data-kt-menu="true"
					>
						{/* Edit Menu Item */}
						<div className="menu-item px-3">
							<a
								className="menu-link px-3"
								onClick={openEditModal}
							>
								Edit
							</a>
						</div>

						{/* Delete Menu Item */}
						{showDelete && (
							<div className="menu-item px-3">
								<a
									className="menu-link px-3"
									data-kt-users-table-filter="delete_row"
									onClick={async () =>
										await deleteItem.mutateAsync()
									}
								>
									Delete
								</a>
							</div>
						)}
					</div>

					{/* Notify Pet Owners Button */}
					<button
						className="btn btn-light-primary btn-active-primary btn-sm mx-3"
						onClick={handleNotifyPetOwners}
					>
						<KTIcon iconName="notification" className="fs-5 m-0" />
						Notify Pet Owners
					</button>
				</>
			)}
		</>
	);
};

export { EventActionsCell };
