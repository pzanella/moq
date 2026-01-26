declare global {
	namespace JSX {
		interface IntrinsicElements {
			"hang-watch-ui": {
				children?: JSX.Element;
				style?: JSX.CSSProperties;
				class?: string;
				className?: string;
			};
			"hang-publish-ui": {
				children?: JSX.Element;
				style?: JSX.CSSProperties;
				class?: string;
				className?: string;
			};
		}
	}
}

export {};
