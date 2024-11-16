import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { PetownersListWrapper } from "./events-list/EventsList";

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
];

const EventsPage = () => {
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
								Event Lists
							</PageTitle>
							<PetownersListWrapper />
						</>
					}
				/>
				{/* Navigate to /veterinarians by default */}
				<Route index element={<Navigate to="lists" />} />
			</Route>
		</Routes>
	);
};

export default EventsPage;
