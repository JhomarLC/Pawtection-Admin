import { FC, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isNotEmpty } from "../../../../../../_metronic/helpers";
import { initialMType, MType } from "../core/_models";
import clsx from "clsx";
import { useListView } from "../core/ListViewProvider";
import { PetownersListLoading } from "../components/loading/EventsListLoading";
import { createMType, updateMtype } from "../core/_requests";
import { useQueryResponse } from "../core/QueryResponseProvider";

type Props = {
	isUserLoading: boolean;
	mtype: MType;
};

const editUserSchema = Yup.object().shape({
	name: Yup.string()
		.min(3, "Minimum 3 characters")
		.max(50, "Maximum 50 characters")
		.required("Name is required"),
	status: Yup.string().required("Status is required"),
});

const MedicationsTypeEditModalForm: FC<Props> = ({ mtype, isUserLoading }) => {
	const { setItemIdForUpdate } = useListView();
	const { refetch } = useQueryResponse();

	const [userForEdit] = useState<MType>({
		...mtype,
		name: mtype.name || initialMType.name,
		status: mtype.status || initialMType.status,
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
					await updateMtype(values);
				} else {
					await createMType(values);
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
					{!isNotEmpty(mtype.id) && (
						<div className="fv-row mb-7">
							{/* begin::Label */}
							<label className="required fw-bold fs-6 mb-2">
								Medications Type
							</label>
							{/* end::Label */}

							{/* begin::Input */}
							<input
								placeholder="Medications Type"
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
					)}
					{/* end::Input group */}
					{/* begin::Input group */}
					<div className="mb-7">
						{/* begin::Label */}
						<label className="required fw-bold fs-6 mb-5">
							Status
						</label>
						{/* end::Label */}
						{/* begin::Roles */}
						{/* begin::Input row */}
						<div className="d-flex fv-row">
							{/* begin::Radio */}
							<div className="form-check form-check-custom form-check-solid">
								{/* begin::Input */}
								<input
									className="form-check-input me-3"
									{...formik.getFieldProps("status")}
									name="status"
									type="radio"
									value="Active" // Use consistent casing
									id="kt_modal_update_role_option_0"
									checked={formik.values.status === "Active"}
									disabled={
										formik.isSubmitting || isUserLoading
									}
								/>
								{/* end::Input */}
								{/* begin::Label */}
								<label
									className="form-check-label"
									htmlFor="kt_modal_update_role_option_0"
								>
									<div className="fw-bolder text-gray-800">
										Active
									</div>
									<div className="text-gray-600">
										Set the Medications Type to Active
									</div>
								</label>
								{/* end::Label */}
							</div>
							{/* end::Radio */}
						</div>
						{/* end::Input row */}
						<div className="separator separator-dashed my-5"></div>
						{/* begin::Input row */}
						<div className="d-flex fv-row">
							{/* begin::Radio */}
							<div className="form-check form-check-custom form-check-solid">
								{/* begin::Input */}
								<input
									className="form-check-input me-3"
									{...formik.getFieldProps("status")}
									name="status"
									type="radio"
									value="Inactive" // Use consistent casing
									id="kt_modal_update_role_option_1"
									checked={
										formik.values.status === "Inactive"
									} // Match case with value
									disabled={
										formik.isSubmitting || isUserLoading
									}
								/>
								{/* end::Input */}
								{/* begin::Label */}
								<label
									className="form-check-label"
									htmlFor="kt_modal_update_role_option_1"
								>
									<div className="fw-bolder text-gray-800">
										Inactive
									</div>
									<div className="text-gray-600">
										Set the Medications Type to Inactive
									</div>
								</label>
								{/* end::Label */}
							</div>
							{/* end::Radio */}
						</div>
						{/* end::Roles */}
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
			{(formik.isSubmitting || isUserLoading) && <PetownersListLoading />}
		</>
	);
};

export { MedicationsTypeEditModalForm };
