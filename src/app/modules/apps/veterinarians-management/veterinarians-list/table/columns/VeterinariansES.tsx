import { FC } from "react";

type Props = {
	electronic_signature?: string;
};

const VET_ES_PATH =
	import.meta.env.VITE_APP_BACKEND_IMAGE + "electronic_signatures/";
const VeterinariansES: FC<Props> = ({ electronic_signature }) => (
	<div className="symbol symbol-50px" style={{ backgroundColor: "white" }}>
		<img src={VET_ES_PATH + electronic_signature} alt="" />
	</div>
);

export { VeterinariansES };
