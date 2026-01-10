import type { JSX } from "solid-js";

/**
 * Props for icon components.
 */
export type IconProps = {
	/** Optional CSS class for styling */
	class?: string;
};

/**
 * Icon component type definition.
 */
export type IconComponent = (props: IconProps) => JSX.Element;
