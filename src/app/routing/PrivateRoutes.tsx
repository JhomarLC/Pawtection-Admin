import { FC, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import PetownersPage from "../modules/apps/petowners-management/PetownersPage";
import VeterinarianPage from "../modules/apps/veterinarians-management/VeterinarianPage";
import PetPage from "../modules/apps/pets-management/PetPage";
import MedicationsTypePage from "../modules/apps/medication-type-management/MedicationTypesPage";
import MedicationsNamePage from "../modules/apps/medication-name-management/MedicationsNamePage";
import EventsPage from "../modules/apps/events-management/EventsPage";

const PrivateRoutes = () => {
	return (
		<Routes>
			<Route element={<MasterLayout />}>
				{/* Redirect to Dashboard after success login/registartion */}
				<Route path="auth/*" element={<Navigate to="/dashboard" />} />
				{/* Pages */}
				<Route path="dashboard" element={<DashboardWrapper />} />
				<Route
					path="veterinarians/*"
					element={
						<SuspensedView>
							<VeterinarianPage />
						</SuspensedView>
					}
				/>
				<Route
					path="petowners/*"
					element={
						<SuspensedView>
							<PetownersPage />
						</SuspensedView>
					}
				/>
				<Route
					path="petowners/:petOwnerId/pets/*"
					element={
						<SuspensedView>
							<PetPage />
						</SuspensedView>
					}
				/>
				<Route
					path="medications-type/*"
					element={
						<SuspensedView>
							<MedicationsTypePage />
						</SuspensedView>
					}
				/>
				<Route
					path="medications-type/:medtypeId/medication-names/*"
					element={
						<SuspensedView>
							<MedicationsNamePage />
						</SuspensedView>
					}
				/>
				<Route
					path="events/*"
					element={
						<SuspensedView>
							<EventsPage />
						</SuspensedView>
					}
				/>

				<Route path="*" element={<Navigate to="/error/404" />} />
			</Route>
		</Routes>
	);
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
	const baseColor = getCSSVariableValue("--bs-primary");
	TopBarProgress.config({
		barColors: {
			"0": baseColor,
		},
		barThickness: 1,
		shadowBlur: 5,
	});
	return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
