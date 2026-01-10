import { createEffect, createSignal } from "solid-js";
import Button from "../shared/button";
import { Mute, VolumeHigh, VolumeLow, VolumeMedium } from "../shared/icons";
import useWatchUIContext from "./useWatchUIContext";

const getVolumeIcon = (volume: number, isMuted: boolean) => {
	if (isMuted || volume === 0) {
		return <Mute />;
	} else if (volume > 0 && volume <= 33) {
		return <VolumeLow />;
	} else if (volume > 33 && volume <= 66) {
		return <VolumeMedium />;
	} else {
		return <VolumeHigh />;
	}
};

export default function VolumeSlider() {
	const [volumeLabel, setVolumeLabel] = createSignal<number>(0);
	const context = useWatchUIContext();

	const onInputChange = (event: Event) => {
		const el = event.currentTarget as HTMLInputElement;
		const volume = parseFloat(el.value);
		context.setVolume(volume);
	};

	createEffect(() => {
		const currentVolume = context.currentVolume() || 0;
		setVolumeLabel(Math.round(currentVolume));
	});

	return (
		<div class="volumeSliderContainer">
			<Button title={context.isMuted() ? "Unmute" : "Mute"} onClick={() => context.toggleMuted()}>
				{getVolumeIcon(context.currentVolume(), context.isMuted())}
			</Button>
			<input type="range" onChange={onInputChange} min="0" max="100" value={context.currentVolume()} />
			<span class="volumeLabel">{volumeLabel()}</span>
		</div>
	);
}
