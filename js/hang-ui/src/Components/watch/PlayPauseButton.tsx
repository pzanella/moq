import { Show } from "solid-js";
import Button from "../shared/button";
import { Pause, Play } from "../shared/icons";
import useWatchUIContext from "./useWatchUIContext";

export default function PlayPauseButton() {
	const context = useWatchUIContext();
	const onClick = () => {
		context.togglePlayback();
	};

	return (
		<Button title={context.isPlaying() ? "Pause" : "Play"} class="button--playback" onClick={onClick}>
			<Show when={context.isPlaying()} fallback={<Play />}>
				<Pause />
			</Show>
		</Button>
	);
}
