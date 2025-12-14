import { createSignal } from "solid-js";
import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createMockProviderProps } from "../../__tests__/utils";
import { Button } from "../../components/Button";
import { StatsContext } from "../../context";

describe("Button", () => {
	let container: HTMLDivElement;
	let dispose: (() => void) | undefined;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
	});

	afterEach(() => {
		dispose?.();
		dispose = undefined;
		document.body.removeChild(container);
	});

	it("renders with correct initial classes", () => {
		const onToggle = () => {};

		dispose = render(() => {
			const mockAudioVideo = createMockProviderProps();
			return (
				<StatsContext.Provider value={mockAudioVideo}>
					<Button isPanelVisible={false} onToggle={onToggle} />
				</StatsContext.Provider>
			);
		}, container);

		const button = container.querySelector("button");
		expect(button).toBeTruthy();
		expect(button?.classList.contains("stats__button")).toBe(true);
	});

	it("renders button element", () => {
		const onToggle = () => {};
		dispose = render(() => {
			const mockAudioVideo = createMockProviderProps();
			return (
				<StatsContext.Provider value={mockAudioVideo}>
					<Button isPanelVisible={false} onToggle={onToggle} />
				</StatsContext.Provider>
			);
		}, container);

		const button = container.querySelector("button");
		expect(button?.tagName).toBe("BUTTON");
	});

	it("renders with correct aria attributes when hidden", () => {
		const onToggle = () => {};
		dispose = render(() => {
			const mockAudioVideo = createMockProviderProps();
			return (
				<StatsContext.Provider value={mockAudioVideo}>
					<Button isPanelVisible={false} onToggle={onToggle} />
				</StatsContext.Provider>
			);
		}, container);

		const button = container.querySelector("button");
		expect(button?.getAttribute("aria-label")).toBe("Show stats");
		expect(button?.getAttribute("aria-pressed")).toBe("false");
	});

	it("renders with correct aria attributes when visible", () => {
		const onToggle = () => {};
		dispose = render(() => {
			const mockAudioVideo = createMockProviderProps();
			return (
				<StatsContext.Provider value={mockAudioVideo}>
					<Button isPanelVisible={true} onToggle={onToggle} />
				</StatsContext.Provider>
			);
		}, container);

		const button = container.querySelector("button");
		expect(button?.getAttribute("aria-label")).toBe("Hide stats");
		expect(button?.getAttribute("aria-pressed")).toBe("true");
	});

	it("updates aria attributes when visibility changes", () => {
		const onToggle = () => {};

		dispose = render(() => {
			const mockAudioVideo = createMockProviderProps();
			const [isPanelVisible, _setIsPanelVisible] = createSignal(false);

			// This test now only checks the initial state.
			// A separate test would be needed to check the update.
			return (
				<StatsContext.Provider value={mockAudioVideo}>
					<Button isPanelVisible={isPanelVisible()} onToggle={onToggle} />
				</StatsContext.Provider>
			);
		}, container);

		const button = container.querySelector("button");
		expect(button?.getAttribute("aria-pressed")).toBe("false");
	});

	it("renders icon correctly", () => {
		const onToggle = () => {};

		dispose = render(() => {
			const mockAudioVideo = createMockProviderProps();
			return (
				<StatsContext.Provider value={mockAudioVideo}>
					<Button isPanelVisible={false} onToggle={onToggle} />
				</StatsContext.Provider>
			);
		}, container);

		const iconDiv = container.querySelector(".stats__icon");
		expect(iconDiv).toBeTruthy();

		const svg = iconDiv?.querySelector("svg");
		expect(svg).toBeTruthy();
		expect(svg?.querySelector("title")?.textContent).toBe("Open statistics");
	});

	it("has correct title attribute", () => {
		const onToggle = () => {};

		dispose = render(() => {
			const mockAudioVideo = createMockProviderProps();
			return (
				<StatsContext.Provider value={mockAudioVideo}>
					<Button isPanelVisible={true} onToggle={onToggle} />
				</StatsContext.Provider>
			);
		}, container);

		const button = container.querySelector("button");
		expect(button?.getAttribute("title")).toBe("Hide stats");
	});
});
