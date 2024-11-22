import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { PetListWrapper } from "./pet-medications-list/PetMedicationsList";

const usersBreadcrumbs: Array<PageLink> = [
	{
		title: "Dashboard",
		path: "/",
		isSeparator: false,
		isActive: false,
	},
	{
		title: "",
		path: "",
		isSeparator: true,
		isActive: false,
	},
	{
		title: "Pet Owners Lists",
		path: "/petowners/lists",
		isSeparator: false,
		isActive: false,
	},
	{
		title: "",
		path: "",
		isSeparator: true,
		isActive: false,
	},
];

const PetMedicationsPage = () => {
	return (
		<Routes>
			{/* Wrap with a parent route */}
			<Route path="/" element={<Outlet />}>
				{/* Define the path for petowners */}
				<Route
					path="lists"
					element={
						<>
							<PageTitle breadcrumbs={usersBreadcrumbs}>
								Pet Medications
							</PageTitle>
							<PetListWrapper />
						</>
					}
				/>
				{/* Navigate to /veterinarians by default */}
				<Route index element={<Navigate to="lists" />} />
			</Route>
		</Routes>
	);
};

export default PetMedicationsPage;
