import { For } from "solid-js";
import type { ProviderProps } from "../types";
import { statsDetailItems } from "./icons";
import { StatsItem } from "./StatsItem";

/**
 * Props for stats panel component
 */
interface StatsPanelProps extends ProviderProps {}

/**
 * Panel displaying all metrics in a grid layout
 */
export const StatsPanel = (props: StatsPanelProps) => {
	return (
		<div class="stats__panel">
			<For each={statsDetailItems}>
				{({ name, statProvider, svg }) => (
					<StatsItem
						name={name}
						statProvider={statProvider}
						svg={svg()}
						audio={props.audio}
						video={props.video}
					/>
				)}
			</For>
		</div>
	);
};
