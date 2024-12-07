import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { PageTitle } from "../../../_metronic/layout/core";
import { StatisticsWidget5 } from "../../../_metronic/partials/widgets";
import { MixedWidget10 } from "../../../_metronic/partials/widgets/mixed/MixedWidget10";
import { MixedWidget16 } from "../../../_metronic/partials/widgets/mixed/MixedWidget16";
import { MixedWidget17 } from "../../../_metronic/partials/widgets/mixed/MixedWidget17";
import axios, { AxiosResponse } from "axios";
import { MixedWidget18 } from "../../../_metronic/partials/widgets/mixed/MixedWidget18";

// Define API response interfaces
interface VeterinariansResponse {
	filtered_count: number;
	[key: string]: unknown;
}

interface Event {
	date_time: string;
	[key: string]: unknown;
}

const DashboardWrapper = () => {
	const intl = useIntl();
	const [actiVets, setActivets] = useState<number>(0);
	const [eventCount, setEventCount] = useState<number>(0);
	const [feeToday, setFeeToday] = useState<number>();
	const [loading, setLoading] = useState<boolean>(true); // Loading state

	const getDashboardData = async () => {
		setLoading(true); // Start loading
		try {
			const response: AxiosResponse<VeterinariansResponse> =
				await axios.get(
					`${
						import.meta.env.VITE_APP_API_URL
					}/veterinarians?status=approved`
				);
			setActivets(response.data.filtered_count || 0);

			const responseFee: AxiosResponse<{
				date: string;
				total_fees: number;
			}> = await axios.get(
				`${import.meta.env.VITE_APP_API_URL}/pets/medications/fee`
			);

			setFeeToday(responseFee.data.total_fees || 0); // Set only total_fees

			const eventResponse: AxiosResponse<{ data: Event[] }> =
				await axios.get(`${import.meta.env.VITE_APP_API_URL}/events`);
			const now = new Date();
			const upcomingEvents = eventResponse.data.data.filter(
				(event) => new Date(event.date_time) > now
			);
			setEventCount(upcomingEvents.length);
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false); // End loading
		}
	};

	useEffect(() => {
		getDashboardData();
	}, []);

	return (
		<>
			<PageTitle breadcrumbs={[]}>
				{intl.formatMessage({ id: "MENU.DASHBOARD" })}
			</PageTitle>

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
						count={actiVets || 0}
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
						count={eventCount || 0}
					/>
				</div>
				<div className="col-xl-4">
					<StatisticsWidget5
						className="card-xl-stretch mb-xl-8"
						svgIcon="sort"
						color="warning"
						iconColor="white"
						title="Medication Fee"
						description="Medication Fee Received Today"
						titleColor="white"
						descriptionColor="white"
						count={"PHP " + (feeToday ? feeToday : 0)}
					/>
				</div>
			</div>

			{/* MixedWidgets Section */}
			<MixedWidgets loading={loading} />
		</>
	);
};

const MixedWidgets = React.memo(({ loading }: { loading: boolean }) => {
	if (loading) {
		return (
			<div className="text-center mt-10">
				<button type="button" className="btn btn-primary" disabled>
					<span className="indicator-label">Loading...</span>
					<span className="indicator-progress">
						Please wait...{" "}
						<span className="spinner-border spinner-border-sm align-middle ms-2"></span>
					</span>
				</button>
			</div>
		);
	}

	return (
		<>
			<div className="row g-5 g-xl-8">
				<div className="col-xl-4">
					<MixedWidget10
						className="card-xl-stretch-100 mb-xl-8"
						chartColor="primary"
						chartHeight="100px"
					/>
				</div>
				<div className="col-xl-4">
					<MixedWidget17
						className="card-xl-stretch-100 mb-xl-8"
						chartColor="primary"
						chartHeight="100px"
					/>
				</div>
				<div className="col-xl-4">
					<MixedWidget18
						className="card-xl-stretch-100 mb-xl-8"
						chartColor="warning"
						chartHeight="150px"
					/>
				</div>
			</div>
			<div className="row g-5 g-xl-8">
				<div className="col-xl-8">
					<MixedWidget16
						className="card-xl-stretch-100 mb-xl-8"
						chartColor="success"
						chartHeight="100px"
					/>
				</div>
			</div>
		</>
	);
});

export { DashboardWrapper };
