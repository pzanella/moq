import { statsButtonIcon } from "./icons";

/**
 * Props for toggle button component
 */
interface ButtonProps {
	/** Whether stats panel is currently visible */
	isPanelVisible: boolean;
	/** Callback when button is clicked */
	onToggle: (value: boolean) => void;
}

/**
 * Toggle button for showing/hiding stats panel
 */
export const Button = (props: ButtonProps) => {
	return (
		<button
			type="button"
			class="stats__button"
			onClick={() => props.onToggle(!props.isPanelVisible)}
			title={props.isPanelVisible ? "Hide stats" : "Show stats"}
			aria-label={props.isPanelVisible ? "Hide stats" : "Show stats"}
			aria-pressed={props.isPanelVisible}
		>
			<div class="stats__icon">{statsButtonIcon()}</div>
		</button>
	);
};
