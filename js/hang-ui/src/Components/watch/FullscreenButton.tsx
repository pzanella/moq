import Button from "../shared/button";
import Icon from "../shared/icon";
import useWatchUIContext from "./useWatchUIContext";

export default function FullscreenButton() {
	const context = useWatchUIContext();

	const onClick = () => {
		context.toggleFullscreen();
	};

	return (
		<Button title="Fullscreen" onClick={onClick}>
			<Icon name={context.isFullscreen() ? "fullscreen-exit" : "fullscreen-enter"} />
		</Button>
	);
}
