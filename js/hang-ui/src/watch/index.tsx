import type HangWatch from "@moq/hang/watch/element";
import { render } from "solid-js/web";
import { WatchUI } from "./element.tsx";

/**
 * @tag hang-watch-ui
 * @summary Watch video stream with full UI controls
 * @description A custom element that provides a complete user interface for watching live or on-demand video streams
 * over Media over QUIC (MOQ). Includes playback controls, quality selection, stats panel, and automatic buffering.
 *
 * @slot default - Container for the hang-watch element and canvas
 *
 * @example HTML
 * ```html
 * <hang-watch-ui>
 *   <hang-watch url="https://example.com/stream" path="/stream" jitter="100" muted reload volume="0">
 *     <canvas style="width: 100%; height: auto;" width="1280" height="720"></canvas>
 *   </hang-watch>
 * </hang-watch-ui>
 * ```
 *
 * @example React
 * ```tsx
 * import { HangWatchUI } from '@moq/hang-ui/react';
 * import '@moq/hang/watch/element';
 *
 * export function VideoPlayer({ url, path }) {
 *   return (
 *     <HangWatchUI>
 *       <hang-watch url={url} path={path} jitter="100" muted reload volume="0">
 *         <canvas style={{ width: '100%', height: 'auto' }} width="1280" height="720" />
 *       </hang-watch>
 *     </HangWatchUI>
 *   );
 * }
 * ```
 */
class HangWatchComponent extends HTMLElement {
	#root?: HTMLDivElement;

	connectedCallback() {
		this.#root = document.createElement("div");
		this.appendChild(this.#root);

		render(() => {
			const watch: HangWatch | null = this.querySelector("hang-watch");
			return watch ? <WatchUI watch={watch} /> : null;
		}, this.#root);
	}

	disconnectedCallback() {
		this.#root?.remove();
	}
}

customElements.define("hang-watch-ui", HangWatchComponent);
export { HangWatchComponent };
