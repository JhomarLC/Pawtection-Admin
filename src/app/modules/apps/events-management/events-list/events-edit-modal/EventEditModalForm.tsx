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
	// pushNotif,
	updateEvent,
} from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";
import { parse } from "date-fns/parse";
import axios from "axios";

type Props = {
	isUserLoading: boolean;
	event: Event;
};

type Notif = {
	to?: string;
	title?: string | undefined;
	body?: string;
};
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
				if (isNotEmpty(values.id)) {
					const res = await getNotificationTokens("");
					await updateEvent(values);

					if (res && res.data) {
						for (const user of res.data) {
							const notification: Notif = {
								to: user.token,
								title: "Attention, Event Updated",
								body: `Event "${values.name}" is now scheduled at ${values.place} on ${values.date_time}.`,
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
				} else {
					const res = await getNotificationTokens("");
					await createEvent(values);

					if (res && res.data) {
						for (const user of res.data) {
							const notification: Notif = {
								to: user.token,
								title: "New Event Created",
								body: `Event "${values.name}" is scheduled at ${values.place} on ${values.date_time}.`,
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
				}
			} catch (ex) {
				console.error(ex);
			} finally {
				setSubmitting(true);
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
				{/* begin::Scroll */}
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
					{/* begin::Input group */}
					<div className="fv-row mb-7">
						{/* begin::Label */}
						<label className="required fw-bold fs-6 mb-2">
							Event Name
						</label>
						{/* end::Label */}

						{/* begin::Input */}
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
						{/* end::Input */}
					</div>
					{/* end::Input group */}
					{/* begin::Input group */}
					<div className="fv-row mb-7">
						{/* begin::Label */}
						<label className="required fw-bold fs-6 mb-2">
							Date Time
						</label>
						{/* end::Label */}

						{/* begin::Input */}
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
						{/* end::Input */}
					</div>
					{/* end::Input group */}

					{/* begin::Input group */}
					<div className="fv-row mb-7">
						{/* begin::Label */}
						<label className="required fw-bold fs-6 mb-2">
							Place
						</label>
						{/* end::Label */}

						{/* begin::Input */}
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
					{/* end::Input group */}

					{/* begin::Input group */}
					<div className="fv-row mb-7">
						{/* begin::Label */}
						<label className="fw-bold fs-6 mb-2">Description</label>
						{/* end::Label */}

						{/* begin::Input */}
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
					{/* end::Input group */}
				</div>
				{/* end::Scroll */}

				{/* begin::Actions */}
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
				{/* end::Actions */}
			</form>
			{(formik.isSubmitting || isUserLoading) && <EventsListLoading />}
		</>
	);
};

export { EventEditModalForm };
