import type { IconProps } from "./types";

export function Pause(props: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="var(--color-white)"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class={props.class}
			classList={{ "flex--center": true }}
		>
			<rect x="14" y="3" width="5" height="18" rx="1" />
			<rect x="5" y="3" width="5" height="18" rx="1" />
		</svg>
	);
}
