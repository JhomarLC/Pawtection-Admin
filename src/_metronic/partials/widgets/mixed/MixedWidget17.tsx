import { useEffect, useRef, FC, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import axios from "axios";
import { getCSSVariableValue } from "../../../assets/ts/_utils";
import { useThemeMode } from "../../layout/theme-mode/ThemeModeProvider";
import Select, { SingleValue } from "react-select";

type Option = {
	value: string;
	label: string;
};

type Props = {
	className: string;
	chartColor: string;
	chartHeight: string;
};

const MixedWidget17: FC<Props> = ({ className, chartColor, chartHeight }) => {
	const chartRef = useRef<HTMLDivElement | null>(null);
	const { mode } = useThemeMode();
	const [categories, setCategories] = useState<string[]>([]);
	const [seriesData, setSeriesData] = useState<number[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [type, setType] = useState<"monthly" | "yearly">("monthly");
	const [selectedPetType, setSelectedPetType] = useState<Option>({
		value: "All",
		label: "All Pets",
	});

	const [selectedBarangay, setSelectedBarangay] = useState<Option>({
		value: "All",
		label: "All Barangays",
	});

	const pettypes: Option[] = [
		{ value: "All", label: "All Pets" },
		{ value: "dog", label: "Dog Pets" },
		{ value: "cat", label: "Cat Pets" },
	];

	const barangays: Option[] = [
		{ value: "All", label: "All Barangays" },
		{ value: "A. Pascual", label: "A. Pascual" },
		{ value: "Abar Ist", label: "Abar Ist" },
		{ value: "Abar 2nd", label: "Abar 2nd" },
		{ value: "Bagong Sikat", label: "Bagong Sikat" },
		{ value: "Caanawan", label: "Caanawan" },
		{ value: "Calaocan", label: "Calaocan" },
		{ value: "Camanacsacan", label: "Camanacsacan" },
		{ value: "Culaylay", label: "Culaylay" },
		{ value: "Dizol", label: "Dizol" },
		{ value: "Kaliwanagan", label: "Kaliwanagan" },
		{ value: "Kita-Kita", label: "Kita-Kita" },
		{ value: "Malasin", label: "Malasin" },
		{ value: "Manicla", label: "Manicla" },
		{ value: "Palestina", label: "Palestina" },
		{ value: "Parang Mangga", label: "Parang Mangga" },
		{ value: "Villa Joson", label: "Villa Joson" },
		{ value: "Pinili", label: "Pinili" },
		{ value: "Rafael Rueda, Sr. Pob.", label: "Rafael Rueda, Sr. Pob." },
		{
			value: "Ferdinand E. Marcos Pob.",
			label: "Ferdinand E. Marcos Pob.",
		},
		{ value: "Canuto Ramos Pob.", label: "Canuto Ramos Pob." },
		{ value: "Raymundo Eugenio Pob.", label: "Raymundo Eugenio Pob." },
		{ value: "Crisanto Sanchez Pob.", label: "Crisanto Sanchez Pob." },
		{ value: "Porais", label: "Porais" },
		{ value: "San Agustin", label: "San Agustin" },
		{ value: "San Juan", label: "San Juan" },
		{ value: "San Mauricio", label: "San Mauricio" },
		{ value: "Santo Niño 1st", label: "Santo Niño 1st" },
		{ value: "Santo Niño 2nd", label: "Santo Niño 2nd" },
		{ value: "Santo Tomas", label: "Santo Tomas" },
		{ value: "Sibut", label: "Sibut" },
		{ value: "Sinipit Bubon", label: "Sinipit Bubon" },
		{ value: "Santo Niño 3rd", label: "Santo Niño 3rd" },
		{ value: "Tabulac", label: "Tabulac" },
		{ value: "Tayabo", label: "Tayabo" },
		{ value: "Tondod", label: "Tondod" },
		{ value: "Tulat", label: "Tulat" },
		{ value: "Villa Floresca", label: "Villa Floresca" },
		{ value: "Villa Marina", label: "Villa Marina" },
	];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_APP_API_URL
					}/getchart2?type=${type}&count=${
						selectedBarangay.value
					}&pettype=${selectedPetType.value}`
				); // Replace with your endpoint

				const data = response.data;
				// Assuming the response has "categories" and "data" keys

				setCategories(data.categories || []);
				setSeriesData(data.data || []);
				setTotalCount(data.total_count || 0);
			} catch (error) {
				console.error("Error fetching chart data:", error);
			}
		};

		fetchData();
	}, [type, selectedBarangay.value, selectedPetType]);

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
						<li className="nav-item d-flex gap-5">
							<Select
								className="react-select-styled react-select-solid react-select-sm"
								classNamePrefix="react-select"
								onChange={(newValue: SingleValue<Option>) => {
									if (newValue) setSelectedPetType(newValue);
								}}
								value={selectedPetType}
								options={pettypes}
								styles={{
									control: (provided) => ({
										...provided,
										minWidth: 150,
										marginTop: 8,
									}),
								}}
							/>
							<Select
								className="react-select-styled react-select-solid react-select-sm"
								classNamePrefix="react-select"
								onChange={(newValue: SingleValue<Option>) => {
									if (newValue) setSelectedBarangay(newValue);
								}}
								value={selectedBarangay}
								options={barangays}
								styles={{
									control: (provided) => ({
										...provided,
										minWidth: 150,
										marginTop: 8,
									}),
								}}
							/>
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
								className="text-gray-900 text-hover-success fw-bold fs-3"
							>
								{selectedPetType.label} in{" "}
								{selectedBarangay.label}
							</a>

							<div className="text-muted fs-7 fw-semibold">
								{/* {new Date().getFullYear()} */}
								of San Jose City
							</div>
						</div>

						<div className={`fw-bold fs-1 text-${chartColor}`}>
							{totalCount}
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
				name: "Approved",
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
					return val + " Pets";
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

export { MixedWidget17 };
