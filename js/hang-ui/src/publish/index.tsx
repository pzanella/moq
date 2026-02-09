import type HangPublish from "@moq/hang/publish/element";
import { render } from "solid-js/web";
import { PublishUI } from "./element.tsx";

/**
 * @tag hang-publish-ui
 * @summary Publish audio/video stream with UI controls
 * @description A custom element that provides a complete user interface for publishing live video or audio streams
 * over Media over QUIC (MOQ). Includes media source selection (camera, microphone, screen, file) and publishing controls.
 *
 * @slot default - Container for the hang-publish element
 *
 * @example HTML
 * ```html
 * <hang-publish-ui>
 *   <hang-publish url="https://example.com/relay" path="/stream">
 *   </hang-publish>
 * </hang-publish-ui>
 * ```
 *
 * @example React
 * ```tsx
 * import { HangPublishUI } from '@moq/hang-ui/react';
 * import '@moq/hang/publish/element';
 *
 * export function StreamPublisher({ url, path }) {
 *   return (
 *     <HangPublishUI>
 *       <hang-publish url={url} path={path} />
 *     </HangPublishUI>
 *   );
 * }
 * ```
 */
class HangPublishComponent extends HTMLElement {
	#root?: HTMLDivElement;

	connectedCallback() {
		this.#root = document.createElement("div");
		this.appendChild(this.#root);

		render(() => {
			const publish: HangPublish | null = this.querySelector("hang-publish");
			return publish ? <PublishUI publish={publish} /> : null;
		}, this.#root);
	}

	disconnectedCallback() {
		this.#root?.remove();
	}
}

customElements.define("hang-publish-ui", HangPublishComponent);
export { HangPublishComponent };
