import { FC } from "react";
import { PetPhotos } from "../core/_models";
import { useListView } from "../core/ListViewProvider";
import { PetMedicationsListLoading } from "../components/loading/PetMedicationsListLoading";
import { useQueryResponse } from "../core/QueryResponseProvider";
// import { QRCodeSVG } from "qrcode.react";

type Props = {
	isUserLoading: boolean;
	petphotos: PetPhotos[];
};

const PetEditModalForm: FC<Props> = ({ petphotos, isUserLoading }) => {
	const { setItemIdForUpdate } = useListView();
	const { refetch } = useQueryResponse();

	const cancel = (withRefresh?: boolean) => {
		if (withRefresh) {
			refetch();
		}
		setItemIdForUpdate(undefined);
	};

	const PET_PROFILE_PATH = `${import.meta.env.VITE_APP_STORAGE}/pet_photos/`;

	return (
		<>
			<form id="kt_modal_add_user_form" className="form" noValidate>
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
					{petphotos.length > 0 ? (
						petphotos.map((photo, index) => (
							<div
								className="fv-row mb-7"
								key={photo.id || index}
							>
								{/* begin::Image input */}
								<img
									className="image-input-wrapper image-input image-input-outline bg-white p-2 h-125px"
									data-kt-image-input="true"
									src={`${PET_PROFILE_PATH}/${photo.image}`}
								>
									{/* <QRCodeSVG
										className="image-input-wrapper w-125px h-125px"
										value={photo.image}
									/> */}
								</img>
							</div>
						))
					) : (
						<p>No photos available for this pet.</p>
					)}

					{/* <div className="fv-row mb-7">
						<label className="d-block fw-bold fs-6 mb-5">
							QR Code
						</label>

						<div
							className="image-input image-input-outline bg-white p-2"
							data-kt-image-input="true"
							style={{ backgroundImage: `url('${blankImg}')` }}
						>
							<QRCodeSVG
								className="image-input-wrapper w-125px h-125px"
								value={petphotos?.id}
							/>
						</div>
					</div> */}
				</div>
				{/* end::Scroll */}

				{/* begin::Actions */}
				<div className="text-center pt-15">
					<button
						type="reset"
						onClick={() => cancel()}
						className="btn btn-light me-3"
						data-kt-users-modal-action="cancel"
					>
						Close
					</button>

					{/* <button
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
					</button> */}
				</div>
				{/* end::Actions */}
			</form>
			{isUserLoading && <PetMedicationsListLoading />}
		</>
	);
};

export { PetEditModalForm };
