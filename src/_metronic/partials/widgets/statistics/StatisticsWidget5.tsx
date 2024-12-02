import React from "react";
import { KTIcon } from "../../../helpers";

type Props = {
	className: string;
	color: string;
	svgIcon: string;
	iconColor: string;
	title: string;
	titleColor?: string;
	description: string;
	descriptionColor?: string;
	count?: number | string;
};

const StatisticsWidget5: React.FC<Props> = ({
	className,
	color,
	svgIcon,
	iconColor,
	title,
	titleColor,
	description,
	descriptionColor,
	count,
}) => {
	return (
		<a href="#" className={`card bg-${color} hoverable ${className}`}>
			<div className="card-body">
				<div className="d-flex flex-stack flex-wrap">
					<div>
						{" "}
						<KTIcon
							iconName={svgIcon}
							className={`text-${iconColor} fs-3x ms-n1`}
						/>
						<div
							className={`text-${titleColor} fw-bold fs-2 mb-2 mt-5`}
						>
							{title}
						</div>
						<div className={`fw-semibold text-${descriptionColor}`}>
							{description}
						</div>
					</div>
					<div className={`fw-bold fs-1 text-${iconColor}`}>
						{count}
					</div>
				</div>
			</div>
		</a>
	);
};

export { StatisticsWidget5 };
