import clsx from "clsx";
import { FC } from "react";
import { Row } from "react-table";
import { MType } from "../../core/_models";

type Props = {
	row: Row<MType>;
};

const CustomRow: FC<Props> = ({ row }) => {
	const { key, ...rowProps } = row.getRowProps(); // Extract key from the row props

	return (
		<tr key={key} {...rowProps}>
			{row.cells.map((cell) => {
				const { key: cellKey, ...cellProps } = cell.getCellProps(); // Extract key from the cell props
				return (
					<td
						key={cellKey} // Pass key explicitly to the <td> element
						{...cellProps}
						className={clsx({
							"text-end min-w-100px":
								cell.column.id === "actions",
						})}
					>
						{cell.render("Cell")}
					</td>
				);
			})}
		</tr>
	);
};

export { CustomRow };
