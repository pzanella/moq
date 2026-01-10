import Button from "../shared/button";
import { Stats } from "../shared/icons";
import useWatchUIContext from "./useWatchUIContext";

/**
 * Toggle button for showing/hiding stats panel
 */
export default function StatsButton() {
	const context = useWatchUIContext();

	const onClick = () => {
		context.setIsStatsPanelVisible(!context.isStatsPanelVisible());
	};

	return (
		<Button title={context.isStatsPanelVisible() ? "Hide stats" : "Show stats"} onClick={onClick}>
			<Stats />
		</Button>
	);
}
