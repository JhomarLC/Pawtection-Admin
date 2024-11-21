import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import {
	MixedWidget10,
	StatisticsWidget5,
} from "../../../_metronic/partials/widgets";
import { MixedWidget16 } from "../../../_metronic/partials/widgets/mixed/MixedWidget16";
import { MixedWidget17 } from "../../../_metronic/partials/widgets/mixed/MixedWidget17";

const DashboardPage = () => (
	<>
		{/* begin::Row */}
		<div className="row g-5 g-xl-8">
			<div className="col-xl-4">
				<StatisticsWidget5
					className="card-xl-stretch mb-xl-8"
					svgIcon="user"
					color="body-white"
					iconColor="primary"
					title="Veterinarians"
					description="All active Veterinarians"
					titleColor="gray-900"
					descriptionColor="gray-400"
					count={14}
				/>
			</div>

			<div className="col-xl-4">
				<StatisticsWidget5
					className="card-xl-stretch mb-xl-8"
					svgIcon="calendar"
					color="primary"
					iconColor="white"
					title="Events"
					description="Upcoming events in San Jose City"
					titleColor="white"
					descriptionColor="white"
					count={3}
				/>
			</div>

			<div className="col-xl-4">
				{/* <StatisticsWidget5
					className="card-xl-stretch mb-5 mb-xl-8"
					svgIcon="left"
					color="dark"
					iconColor="gray-100"
					title="Sales Stats"
					description="50% Increased for FY20"
					titleColor="gray-100"
					descriptionColor="gray-100"
				/> */}
			</div>
		</div>
		{/* end::Row */}

		{/* begin::Row */}
		<div className="row g-5 g-xl-8">
			{/* begin::Col */}
			<div className="col-xl-4">
				<MixedWidget10
					className="card-xl-stretch-100 mb-xl-8"
					chartColor="primary"
					chartHeight="100px"
				/>
				{/* <ListsWidget1 className="card-xl-stretch mb-xl-8" /> */}
			</div>
			{/* end::Col */}

			{/* begin::Col */}
			<div className="col-xl-4">
				<MixedWidget16
					className="card-xl-stretch-100 mb-xl-8"
					chartColor="success"
					chartHeight="100px"
				/>
			</div>
			{/* end::Col */}

			{/* begin::Col */}
			<div className="col-xl-4">
				<MixedWidget17
					className="card-xl-stretch-100 mb-xl-8"
					chartColor="warning"
					chartHeight="100px"
				/>
			</div>
			{/* end::Col */}
		</div>
	</>
);

const DashboardWrapper = () => {
	const intl = useIntl();
	return (
		<>
			<PageTitle breadcrumbs={[]}>
				{intl.formatMessage({ id: "MENU.DASHBOARD" })}
			</PageTitle>
			<DashboardPage />
		</>
	);
};

export { DashboardWrapper };
