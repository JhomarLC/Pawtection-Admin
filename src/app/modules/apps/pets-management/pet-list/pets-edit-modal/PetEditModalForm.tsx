import { FC, useState } from "react";
import { PetPhotos } from "../core/_models";
import { useListView } from "../core/ListViewProvider";
import { PetListLoading } from "../components/loading/PetListLoading";
import { useQueryResponse } from "../core/QueryResponseProvider";
import styles from "../core/PetEditModalForm.module.css";

type Props = {
	isUserLoading: boolean;
	petphotos: PetPhotos[];
};

const PetEditModalForm: FC<Props> = ({ petphotos, isUserLoading }) => {
	const { setItemIdForUpdate } = useListView();
	const { refetch } = useQueryResponse();
	const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null); // For viewing the photo in a modal

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
				{/* begin::Photo Grid */}
				<div className={styles.photoGrid}>
					{petphotos.length > 0 ? (
						petphotos.map((photo, index) => (
							<div
								className={styles.photoGridItem}
								key={photo.id || index}
								onClick={() =>
									setSelectedPhoto(
										`${PET_PROFILE_PATH}/${photo.image}`
									)
								}
							>
								<img
									className={styles.photoGridImage}
									src={`${PET_PROFILE_PATH}/${photo.image}`}
									alt={`Pet ${index + 1}`}
								/>
							</div>
						))
					) : (
						<p className="text-center">No Pet Photos to show.</p>
					)}
				</div>
				;{/* end::Photo Grid */}
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
				</div>
				{/* end::Actions */}
			</form>

			{isUserLoading && <PetListLoading />}

			{/* Photo Modal */}
			{selectedPhoto && (
				<div
					className="modal fade show d-block"
					tabIndex={-1}
					role="dialog"
					style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
					onClick={() => setSelectedPhoto(null)}
				>
					<div
						className="modal-dialog modal-dialog-centered"
						role="document"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
					>
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Pet Photo</h5>
								<button
									type="button"
									className="btn-close"
									aria-label="Close"
									onClick={() => setSelectedPhoto(null)}
								></button>
							</div>
							<div className="modal-body text-center">
								<img
									src={selectedPhoto}
									alt="Pet"
									className="img-fluid"
									style={{
										maxHeight: "400px",
										width: "auto",
									}}
								/>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setSelectedPhoto(null)}
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export { PetEditModalForm };
