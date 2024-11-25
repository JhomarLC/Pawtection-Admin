import { FC, useState } from "react";
import { useLayout } from "../../core";
import { KTIcon } from "../../../helpers";
import { AsideMenu } from "./AsideMenu";
import { AsideToolbar } from "./AsideToolbar";
import { useAuth } from "../../../../app/modules/auth";
import { AlertModal } from "../../../partials/modals/AlertModal";

const AsideDefault: FC = () => {
	const { logout } = useAuth();
	const { classes } = useLayout();
	const [alertVisible, setAlertVisible] = useState(false);

	const handleCloseAlert = () => {
		setAlertVisible(false);
	};

	return (
		<div
			id="kt_aside"
			className="aside"
			data-kt-drawer="true"
			data-kt-drawer-name="aside"
			data-kt-drawer-activate="{default: true, lg: false}"
			data-kt-drawer-overlay="true"
			data-kt-drawer-width="{default:'200px', '300px': '250px'}"
			data-kt-drawer-direction="start"
			data-kt-drawer-toggle="#kt_aside_mobile_toggle"
		>
			{/* begin::Aside Toolbarl */}
			<AlertModal
				type="danger" // Dynamically sets the alert type
				title="Oops!"
				message="Are you sure you want to logout your account?"
				show={alertVisible}
				onClose={handleCloseAlert}
				onCancel={() => {
					handleCloseAlert();
				}}
				onConfirm={() => {
					logout();
					handleCloseAlert();
				}}
			/>
			<div
				className="aside-toolbar flex-column-auto"
				id="kt_aside_toolbar"
			>
				<AsideToolbar />
			</div>
			{/* end::Aside Toolbarl */}
			{/* begin::Aside menu */}
			<div className="aside-menu flex-column-fluid">
				<AsideMenu asideMenuCSSClasses={classes.asideMenu} />
			</div>
			{/* end::Aside menu */}

			{/* begin::Footer */}
			<div
				className="aside-footer flex-column-auto py-5"
				id="kt_aside_footer"
			>
				<a
					className="btn btn-custom btn-primary w-100"
					onClick={() => setAlertVisible(true)}
				>
					<span className="btn-label">Logout</span>
					<span className=" btn-icon fs-2">
						<KTIcon iconName="document" />
					</span>
				</a>
			</div>
			{/* end::Footer */}
		</div>
	);
};

export { AsideDefault };
