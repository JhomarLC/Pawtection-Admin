import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../../_metronic/helpers";
import { Event, initialEvent } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { EventsListLoading } from "../components/loading/EventsListLoading";
import {
	createEvent,
	getNotificationTokens,
	getVetNotificationTokens,
	updateEvent,
} from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { parse } from "date-fns/parse";
import axios from "axios";
import { format } from "date-fns";

type Props = {
	isUserLoading: boolean;
	event: Event;
};

type Notif = {
	to?: string;
	title?: string | undefined;
	body?: string;
};

// Validation Schema
const editUserSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Minimum 3 characters")
		.max(50, "Maximum 50 characters")
		.required("Name is required"),
	date_time: Yup.date()
		.transform(function (value, originalValue) {
			if (this.isType(value)) {
				return value;
			}
			const result = parse(originalValue, "dd.MM.yyyy HH:mm", new Date());
			return result;
		})
		.typeError("Please enter a valid date")
		.required("Date and Time Required")
		.min(new Date(), "Date must be today or later"),
	place: Yup.string()
		.min(3, "Minimum 3 symbols")
		.max(50, "Maximum 50 symbols")
		.required("Place is required"),
});
async function saveNotificationToHistory(
	title: string,
	body: string,
	action: string
) {
	const apiUrl = `${import.meta.env.VITE_APP_API_URL}/notification-history`;

	try {
		const response = await axios.post(
			apiUrl,
			{
				title: title,
				description: body,
				action: action,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		console.log(`Notification saved to history: ${response.data}`);
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Error response from server:", {
				status: error.response?.status,
				data: error.response?.data,
			});
		} else {
			console.error("Unexpected error:", error);
		}
	}
}

// Function to send notifications
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sendNotifications = async (users: any[], title: string, body: string) => {
	if (!users || users.length === 0) {
		console.log("No tokens found in response.");
		return;
	}
	const notifications = users.map((user) => {
		const notification: Notif = {
			to: user.token,
			title,
			body,
		};

		return axios.post(
			`${import.meta.env.VITE_APP_API_URL}/send-notif`,
			notification,
			{
				headers: {
					Accept: "application/json",
					"Accept-encoding": "gzip, deflate",
					"Content-Type": "application/json",
				},
			}
		);
	});

	try {
		await Promise.all(notifications);
		console.log("Notifications sent successfully.");
	} catch (error) {
		console.error("Error sending notifications:", error);
	}
};

const EventEditModalForm: FC<Props> = ({ event, isUserLoading }) => {
	const { setItemIdForUpdate } = useListView();
	const { refetch } = useQueryResponse();

	const [userForEdit] = useState<Event>({
		...event,
		name: event.name || initialEvent.name,
		date_time: event.date_time || initialEvent.date_time,
		place: event.place || initialEvent.place,
		description: event.description || initialEvent.description,
	});

	const cancel = (withRefresh?: boolean) => {
		if (withRefresh) {
			refetch();
		}
		setItemIdForUpdate(undefined);
	};

	const formik = useFormik({
		initialValues: userForEdit,
		validationSchema: editUserSchema,
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);

			try {
				const [tokensRes, vetTokensRes] = await Promise.all([
					getNotificationTokens(""),
					getVetNotificationTokens("approved"),
				]);

				const title = isNotEmpty(values.id)
					? "Attention, Event Updated"
					: "New Event Created";

				const action = isNotEmpty(values.id) ? "edit" : "add";

				const body = `Event "${values.name}" is ${
					isNotEmpty(values.id) ? "now scheduled" : "scheduled"
				} at ${values.place} on ${format(
					new Date(values.date_time),
					"EEEE, MMMM do, yyyy h:mm a"
				)}.`;

				if (isNotEmpty(values.id)) {
					await updateEvent(values);
				} else {
					await createEvent(values);
				}
				await saveNotificationToHistory(title, body, action);
				// Send notifications concurrently
				await Promise.all([
					sendNotifications(
						tokensRes?.data || [],
						title,
						body,
						action
					),
					sendNotifications(
						vetTokensRes?.data || [],
						title,
						body,
						action
					),
				]);
			} catch (ex) {
				console.error(ex);
			} finally {
				setSubmitting(false);
				cancel(true);
			}
		},
	});

	return (
		<>
			<form
				id="kt_modal_add_user_form"
				className="form"
				onSubmit={formik.handleSubmit}
				noValidate
			>
				{/* Form Inputs */}
				<div
					className="d-flex flex-column scroll-y me-n7 pe-7"
					id="kt_modal_add_user_scroll"
					data-kt-scroll="true"
					data-kt-scroll-activate="{default: false, lg: true}"
					data-kt-scroll-max-height="auto"
					data-kt-scroll-dependencies="#kt_modal_add_user_header"
					data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
					data-kt-scroll-offset="300px"
				>
					<div className="fv-row mb-7">
						<label className="required fw-bold fs-6 mb-2">
							Event Name
						</label>
						<input
							placeholder="Event name"
							{...formik.getFieldProps("name")}
							type="text"
							name="name"
							className={clsx(
								"form-control form-control-solid mb-3 mb-lg-0",
								{
									"is-invalid":
										formik.touched.name &&
										formik.errors.name,
								},
								{
									"is-valid":
										formik.touched.name &&
										!formik.errors.name,
								}
							)}
							autoComplete="off"
							disabled={formik.isSubmitting || isUserLoading}
						/>
						{formik.touched.name && formik.errors.name && (
							<div className="fv-plugins-message-container">
								<div className="fv-help-block">
									<span role="alert">
										{formik.errors.name}
									</span>
								</div>
							</div>
						)}
					</div>

					<div className="fv-row mb-7">
						<label className="required fw-bold fs-6 mb-2">
							Date Time
						</label>
						<input
							placeholder="Date Time"
							{...formik.getFieldProps("date_time")}
							type="datetime-local"
							name="date_time"
							className={clsx(
								"form-control form-control-solid mb-3 mb-lg-0",
								{
									"is-invalid":
										formik.touched.date_time &&
										formik.errors.date_time,
								},
								{
									"is-valid":
										formik.touched.date_time &&
										!formik.errors.date_time,
								}
							)}
							autoComplete="off"
							disabled={formik.isSubmitting || isUserLoading}
						/>
						{formik.errors.date_time && (
							<div className="fv-plugins-message-container">
								<div className="fv-help-block">
									<span role="alert">
										{formik.errors.date_time}
									</span>
								</div>
							</div>
						)}
					</div>

					<div className="fv-row mb-7">
						<label className="required fw-bold fs-6 mb-2">
							Place
						</label>
						<input
							placeholder="Place"
							{...formik.getFieldProps("place")}
							name="place"
							type="text"
							className={clsx(
								"form-control form-control-solid mb-3 mb-lg-0",
								{
									"is-invalid":
										formik.touched.place &&
										formik.errors.place,
								},
								{
									"is-valid":
										formik.touched.place &&
										!formik.errors.place,
								}
							)}
							autoComplete="off"
							disabled={formik.isSubmitting || isUserLoading}
						/>
						{formik.errors.place && (
							<div className="fv-plugins-message-container">
								<div className="fv-help-block">
									<span role="alert">
										{formik.errors.place}
									</span>
								</div>
							</div>
						)}
					</div>

					<div className="fv-row mb-7">
						<label className="fw-bold fs-6 mb-2">Description</label>
						<input
							placeholder="Description"
							{...formik.getFieldProps("description")}
							name="description"
							type="text"
							className={clsx(
								"form-control form-control-solid mb-3 mb-lg-0",
								{
									"is-invalid":
										formik.touched.description &&
										formik.errors.description,
								},
								{
									"is-valid":
										formik.touched.description &&
										!formik.errors.description,
								}
							)}
							autoComplete="off"
							disabled={formik.isSubmitting || isUserLoading}
						/>
						{formik.errors.description && (
							<div className="fv-plugins-message-container">
								<div className="fv-help-block">
									<span role="alert">
										{formik.errors.description}
									</span>
								</div>
							</div>
						)}
					</div>
				</div>

				{/* Actions */}
				<div className="text-center pt-15">
					<button
						type="reset"
						onClick={() => cancel()}
						className="btn btn-light me-3"
						data-kt-users-modal-action="cancel"
						disabled={formik.isSubmitting || isUserLoading}
					>
						Discard
					</button>

					<button
						type="submit"
						className="btn btn-primary"
						data-kt-users-modal-action="submit"
						disabled={
							isUserLoading ||
							formik.isSubmitting ||
							!formik.isValid ||
							!formik.touched
						}
					>
						<span className="indicator-label">Submit</span>
						{(formik.isSubmitting || isUserLoading) && (
							<span className="indicator-progress">
								Please wait...{" "}
								<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
							</span>
						)}
					</button>
				</div>
			</form>
			{(formik.isSubmitting || isUserLoading) && <EventsListLoading />}
		</>
	);
};

export { EventEditModalForm };
