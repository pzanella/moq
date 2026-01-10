import { type Component, For } from "solid-js";
import type { IconProps } from "../../shared/icons";
import { Audio, Buffer, Network, Video } from "../../shared/icons";
import type { KnownStatsProviders, ProviderProps } from "../types";
import { StatsItem } from "./StatsItem";

/**
 * Props for stats panel component
 */
interface StatsPanelProps extends ProviderProps {}

export const statsDetailItems: {
	name: string;
	statProvider: KnownStatsProviders;
	Icon: Component<IconProps>;
}[] = [
	{
		name: "Network",
		statProvider: "network",
		Icon: Network,
	},
	{
		name: "Video",
		statProvider: "video",
		Icon: Video,
	},
	{
		name: "Audio",
		statProvider: "audio",
		Icon: Audio,
	},
	{
		name: "Buffer",
		statProvider: "buffer",
		Icon: Buffer,
	},
];

/**
 * Panel displaying all metrics in a grid layout
 */
export const StatsPanel = (props: StatsPanelProps) => {
	return (
		<div class="stats__panel">
			<For each={statsDetailItems}>
				{({ name, statProvider, Icon }) => (
					<StatsItem
						name={name}
						statProvider={statProvider}
						svg={<Icon />}
						audio={props.audio}
						video={props.video}
					/>
				)}
			</For>
		</div>
	);
};
