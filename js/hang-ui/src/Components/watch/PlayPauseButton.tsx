import Button from "../shared/button";
import Icon from "../shared/icon";
import useWatchUIContext from "./useWatchUIContext";

export default function PlayPauseButton() {
	const context = useWatchUIContext();
	const onClick = () => {
		context.togglePlayback();
	};

	return (
		<Button title={context.isPlaying() ? "Pause" : "Play"} class="button--playback" onClick={onClick}>
			<Icon name={context.isPlaying() ? "pause" : "play"} />
		</Button>
	);
}
