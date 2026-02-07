declare global {
	interface HTMLElementTagNameMap {
		"hang-watch-ui": HTMLElement;
	}
	namespace JSX {
		interface IntrinsicElements {
			"hang-watch-ui": HTMLElement;
		}
	}
}

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"hang-watch-ui": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
		}
	}
}

export {};
