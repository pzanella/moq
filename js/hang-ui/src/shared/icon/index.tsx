import { createMemo, type JSX } from "solid-js";

import arrowDown from "./arrow-down.svg?raw";
import arrowUp from "./arrow-up.svg?raw";
import audio from "./audio.svg?raw";
import ban from "./ban.svg?raw";
import buffer from "./buffer.svg?raw";
import camera from "./camera.svg?raw";
import file from "./file.svg?raw";
import fullscreenEnter from "./fullscreen-enter.svg?raw";
import fullscreenExit from "./fullscreen-exit.svg?raw";
import microphone from "./microphone.svg?raw";
import mute from "./mute.svg?raw";
import network from "./network.svg?raw";
import pause from "./pause.svg?raw";
import play from "./play.svg?raw";
import screen from "./screen.svg?raw";
import stats from "./stats.svg?raw";
import video from "./video.svg?raw";
import volumeHigh from "./volume-high.svg?raw";
import volumeLow from "./volume-low.svg?raw";
import volumeMedium from "./volume-medium.svg?raw";

export const icons: Record<string, string> = {
	"arrow-down": arrowDown,
	"arrow-up": arrowUp,
	audio,
	ban,
	buffer,
	camera,
	file,
	"fullscreen-enter": fullscreenEnter,
	"fullscreen-exit": fullscreenExit,
	microphone,
	mute,
	network,
	pause,
	play,
	screen,
	stats,
	video,
	"volume-high": volumeHigh,
	"volume-low": volumeLow,
	"volume-medium": volumeMedium,
};

/**
 * Props for the Icon component.
 * @property name - The icon name (without the .svg extension).
 * @property class - Optional CSS class for the wrapper element.
 */
export type IconProps = {
	name: string;
	class?: string;
};

/**
 * Icon component that renders inlined SVG icons.
 *
 * - All SVGs are bundled at build time
 * - Always renders a <span role="img"> with the SVG as innerHTML
 * - Sets aria-hidden to true so icons are ignored by assistive tech (decorative only)
 * - Error state is exposed via data attribute for styling
 *
 * @param props - IconProps
 * @returns JSX.Element
 */
export default function Icon(props: IconProps): JSX.Element {
	const svg = createMemo(() => icons[props.name] || "");
	const error = createMemo(() => !icons[props.name]);

	return (
		<span
			class={props.class}
			classList={{ "flex--center": true }}
			role="img"
			aria-hidden={true}
			innerHTML={svg()}
			data-icon-error={error() || undefined}
		/>
	);
}
