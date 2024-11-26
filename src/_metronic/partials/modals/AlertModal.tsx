import React from "react";

// Define type for the `type` prop
type AlertType = "danger" | "warning" | "primary" | "success";

// Define the props for the AlertModal
interface AlertModalProps {
	type?: AlertType;
	title?: string;
	message?: string;
	onClose?: () => void;
	onCancel?: () => void;
	onConfirm?: () => void;
	confirmText?: string;
	cancelText?: string;
	show?: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
	type = "danger", // Default to "danger"
	title = "Alert",
	message = "This is a default alert message.",
	onClose,
	onCancel,
	onConfirm,
	confirmText = "Ok, I got it",
	cancelText = "Cancel",
	show = false,
}) => {
	if (!show) return null; // Don't render if `show` is false

	// Define type-based classes
	const typeClasses = {
		danger: {
			bg: "bg-light-danger",
			border: "border-danger",
			text: "text-danger",
			btnOutline: "btn-outline-danger",
			btn: "btn-danger",
		},
		warning: {
			bg: "bg-light-warning",
			border: "border-warning",
			text: "text-warning",
			btnOutline: "btn-outline-warning",
			btn: "btn-warning",
		},
		primary: {
			bg: "bg-light-primary",
			border: "border-primary",
			text: "text-primary",
			btnOutline: "btn-outline-primary",
			btn: "btn-primary",
		},
		success: {
			bg: "bg-light-success",
			border: "border-success",
			text: "text-success",
			btnOutline: "btn-outline-success",
			btn: "btn-success",
		},
	};

	const alertClass = typeClasses[type] || typeClasses.danger;

	return (
		<div
			className="alert-overlay d-flex flex-center"
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				zIndex: 1050,
			}}
		>
			<div
				className={`alert alert-dismissible ${alertClass.bg} d-flex flex-center flex-column py-10 px-10 px-lg-20`}
				style={{
					maxWidth: "500px",
					borderRadius: "10px",
					boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
				}}
			>
				<button
					type="button"
					className="position-absolute top-0 end-0 m-2 btn btn-icon"
					style={{
						background: "none",
						border: "none",
						fontSize: "20px",
						cursor: "pointer",
					}}
					onClick={onClose} // Trigger the onClose callback
				>
					&times;
				</button>

				{/* <span
					className={`svg-icon svg-icon-5tx ${alertClass.text} mb-5`}
				>
					!
				</span> */}

				<div className="text-center">
					<h5 className={`fw-bolder fs-1 mb-5 ${alertClass.text}`}>
						{title}
					</h5>

					<div
						className={`separator separator-dashed ${alertClass.border} opacity-25 mb-5`}
					></div>

					<div className="mb-9">{message}</div>
					<div className="d-flex flex-center flex-wrap">
						{onCancel && (
							<button
								className={`btn ${alertClass.btnOutline} btn-outline btn-active-${type} m-2`}
								onClick={onCancel}
							>
								{cancelText}
							</button>
						)}
						{onConfirm && (
							<button
								className={`btn ${alertClass.btn} m-2`}
								onClick={onConfirm}
							>
								{confirmText}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export { AlertModal };
