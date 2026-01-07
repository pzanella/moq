import { createMemo, type JSX } from "solid-js";
import { icons } from "./icons";

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
