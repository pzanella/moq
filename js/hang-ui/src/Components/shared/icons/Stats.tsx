import type { IconProps } from "./types";

export function Stats(props: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class={props.class}
			classList={{ "flex--center": true }}
		>
			<path d="M5 21v-6" />
			<path d="M12 21V3" />
			<path d="M19 21V9" />
		</svg>
	);
}
