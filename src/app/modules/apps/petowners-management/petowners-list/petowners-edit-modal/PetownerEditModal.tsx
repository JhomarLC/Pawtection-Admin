import { useEffect } from "react";
import { PetownerEditModalHeader } from "./PetownerEditModalHeader";
import { PetownerEditModalFormWrapper } from "./PetownerEditModalFormWrapper";

const PetownerEditModal = () => {
	useEffect(() => {
		document.body.classList.add("modal-open");
		return () => {
			document.body.classList.remove("modal-open");
		};
	}, []);

	return (
		<>
			<div
				className="modal fade show d-block"
				id="kt_modal_add_user"
				role="dialog"
				tabIndex={-1}
				aria-modal="true"
			>
				{/* begin::Modal dialog */}
				<div className="modal-dialog modal-dialog-centered mw-650px">
					{/* begin::Modal content */}
					<div className="modal-content">
						<PetownerEditModalHeader />
						{/* begin::Modal body */}
						<div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
							<PetownerEditModalFormWrapper />
						</div>
						{/* end::Modal body */}
					</div>
					{/* end::Modal content */}
				</div>
				{/* end::Modal dialog */}
			</div>
			{/* begin::Modal Backdrop */}
			<div className="modal-backdrop fade show"></div>
			{/* end::Modal Backdrop */}
		</>
	);
};

export { PetownerEditModal };
