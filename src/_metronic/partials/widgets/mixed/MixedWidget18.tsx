import { useEffect, useRef, FC, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import axios from "axios";
import { getCSSVariableValue } from "../../../assets/ts/_utils";
import { useThemeMode } from "../../layout/theme-mode/ThemeModeProvider";

type Props = {
	className: string;
	chartColor: string;
	chartHeight: string;
};

const MixedWidget18: FC<Props> = ({ className, chartColor, chartHeight }) => {
	const chartRef = useRef<HTMLDivElement | null>(null);
	const { mode } = useThemeMode();
	const [categories, setCategories] = useState<string[]>([]);
	const [seriesData, setSeriesData] = useState<number[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [type, setType] = useState<"monthly" | "yearly">("monthly");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_APP_API_URL
					}/pets/medications/fee/chart?type=${type}`
				); // Replace with your endpoint

				const data = response.data;
				// Assuming the response has "categories" and "data" keys

				setCategories(data.categories || []);
				setSeriesData(data.data || []);
				setTotalCount(data.total_fees || 0);
			} catch (error) {
				console.error("Error fetching chart data:", error);
			}
		};

		fetchData();
	}, [type]);

	const refreshChart = () => {
		if (!chartRef.current) {
			return;
		}

		const chart = new ApexCharts(
			chartRef.current,
			chartOptions(chartColor, chartHeight, categories, seriesData)
		);
		if (chart) {
			chart.render();
		}

		return chart;
	};

	useEffect(() => {
		const chart = refreshChart();

		return () => {
			if (chart) {
				chart.destroy();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chartRef, mode, categories, seriesData]);

	return (
		<div className={`card ${className}`}>
			<div className="card-header border-0 pt-5">
				<div className="card-toolbar">
					{/* Navigation for Monthly/Yearly */}
					<ul className="nav">
						<li className="nav-item">
							<button
								className={`nav-link btn btn-sm btn-color-muted btn-active btn-active-light-warning fw-bold px-4 me-1 ${
									type === "monthly" ? "active" : ""
								}`}
								onClick={() => setType("monthly")}
							>
								Monthly
							</button>
						</li>

						<li className="nav-item">
							<button
								className={`nav-link btn btn-sm btn-color-muted btn-active btn-active-light-warning fw-bold px-4 ${
									type === "yearly" ? "active" : ""
								}`}
								onClick={() => setType("yearly")}
							>
								Yearly
							</button>
						</li>
					</ul>
				</div>
			</div>
			{/* begin::Body */}
			<div className="card-body d-flex flex-column p-0">
				{/* begin::Stats */}
				<div className="flex-grow-1 card-p pb-0">
					<div className="d-flex flex-stack flex-wrap">
						<div className="me-2">
							<a
								href="#"
								className="text-gray-900 text-hover-primary fw-bold fs-3"
							>
								{/* {selectedPetType.label} in{" "}
								{selectedBarangay.label} */}
								Fee Received
							</a>

							<div className="text-muted fs-7 fw-semibold">
								{/* {new Date().getFullYear()} */}
								from Different Medications{" "}
								{new Date().getFullYear()}
							</div>
						</div>

						<div className={`fw-bold fs-1 text-${chartColor}`}>
							PHP {totalCount}
						</div>
					</div>
				</div>
				{/* end::Stats */}

				{/* begin::Chart */}
				<div
					ref={chartRef}
					className="mixed-widget-7-chart card-rounded-bottom"
				></div>
				{/* end::Chart */}
			</div>
			{/* end::Body */}
		</div>
	);
};

const chartOptions = (
	chartColor: string,
	chartHeight: string,
	categories: string[],
	seriesData: number[]
): ApexOptions => {
	const labelColor = getCSSVariableValue("--bs-gray-800");
	const strokeColor = getCSSVariableValue("--bs-gray-300");
	const baseColor = getCSSVariableValue("--bs-" + chartColor);
	const lightColor = getCSSVariableValue("--bs-" + chartColor + "-light");

	return {
		series: [
			{
				name: "Fee Received",
				data: seriesData,
			},
		],
		chart: {
			fontFamily: "inherit",
			type: "area",
			height: chartHeight,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: false,
			},
			sparkline: {
				enabled: true,
			},
		},
		plotOptions: {},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: false,
		},
		fill: {
			type: "solid",
			opacity: 1,
		},
		stroke: {
			curve: "smooth",
			show: true,
			width: 3,
			colors: [baseColor],
		},
		xaxis: {
			categories: categories,
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
				style: {
					colors: labelColor,
					fontSize: "12px",
				},
			},
			crosshairs: {
				show: false,
				position: "front",
				stroke: {
					color: strokeColor,
					width: 1,
					dashArray: 3,
				},
			},
			tooltip: {
				enabled: false,
			},
		},
		yaxis: {
			min: 0,
			max: Math.max(...seriesData),
			labels: {
				show: false,
				style: {
					colors: labelColor,
					fontSize: "12px",
				},
			},
		},
		states: {
			normal: {
				filter: {
					type: "none",
					value: 0,
				},
			},
			hover: {
				filter: {
					type: "none",
					value: 0,
				},
			},
			active: {
				allowMultipleDataPointsSelection: false,
				filter: {
					type: "none",
					value: 0,
				},
			},
		},
		tooltip: {
			style: {
				fontSize: "12px",
			},
			y: {
				formatter: function (val) {
					return "PHP " + val;
				},
			},
		},
		colors: [lightColor],
		markers: {
			colors: [lightColor],
			strokeColors: [baseColor],
			strokeWidth: 3,
		},
	};
};

export { MixedWidget18 };
