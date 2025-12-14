import { createSignal, Show } from "solid-js";
import { useMetrics } from "../context";
import { Button } from "./Button";
import { StatsPanel } from "./StatsPanel";

/**
 * Root wrapper component managing visibility state and layout
 */
export const StatsWrapper = () => {
	const [isPanelVisible, setIsPanelVisible] = createSignal(false);
	const metrics = useMetrics();

	return (
		<div class="stats__wrapper">
			<Button isPanelVisible={isPanelVisible()} onToggle={setIsPanelVisible} />

			<Show when={isPanelVisible()}>
				<StatsPanel audio={metrics.audio} video={metrics.video} />
			</Show>
		</div>
	);
};
