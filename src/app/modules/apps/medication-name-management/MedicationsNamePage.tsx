import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { MedicationsNameListWrapper } from "./medication-name-list/MedicationsNameList";

const usersBreadcrumbs: Array<PageLink> = [
	{
		title: "Medications Type",
		path: "/medications-type",
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

const MedicationsNamePage = () => {
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
								Medication Names
							</PageTitle>
							<MedicationsNameListWrapper />
						</>
					}
				/>
				{/* Navigate to /veterinarians by default */}
				<Route index element={<Navigate to="lists" />} />
			</Route>
		</Routes>
	);
};

export default MedicationsNamePage;
