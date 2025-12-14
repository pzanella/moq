import { render } from "solid-js/web";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createMockProviderProps } from "../../__tests__/utils";
import { StatsWrapper } from "../../components/StatsWrapper";
import { StatsContext } from "../../context";
import type { ProviderProps } from "../../types";

describe("StatsWrapper", () => {
	let container: HTMLDivElement;
	let mockAudioVideo: ProviderProps;
	let dispose: (() => void) | undefined;

	beforeEach(() => {
		container = document.createElement("div");
		document.body.appendChild(container);
		mockAudioVideo = createMockProviderProps();
	});

	afterEach(() => {
		dispose?.();
		dispose = undefined;
		document.body.removeChild(container);
	});

	it("renders with wrapper class", () => {
		dispose = render(
			() => (
				<StatsContext.Provider value={mockAudioVideo}>
					<StatsWrapper />
				</StatsContext.Provider>
			),
			container,
		);

		const wrapper = container.querySelector(".stats__wrapper");
		expect(wrapper).toBeTruthy();
	});

	it("renders button component", () => {
		dispose = render(
			() => (
				<StatsContext.Provider value={mockAudioVideo}>
					<StatsWrapper />
				</StatsContext.Provider>
			),
			container,
		);

		const button = container.querySelector(".stats__button");
		expect(button).toBeTruthy();
	});

	it("initially hides stats panel", () => {
		dispose = render(
			() => (
				<StatsContext.Provider value={mockAudioVideo}>
					<StatsWrapper />
				</StatsContext.Provider>
			),
			container,
		);

		const panel = container.querySelector(".stats__panel");
		expect(panel).toBeFalsy();
	});

	it("has button with correct aria attributes", () => {
		dispose = render(
			() => (
				<StatsContext.Provider value={mockAudioVideo}>
					<StatsWrapper />
				</StatsContext.Provider>
			),
			container,
		);

		const button = container.querySelector("button");
		expect(button?.getAttribute("aria-pressed")).toBe("false");
		expect(button?.getAttribute("aria-label")).toBe("Show stats");
	});

	it("button has correct accessibility attributes", () => {
		dispose = render(
			() => (
				<StatsContext.Provider value={mockAudioVideo}>
					<StatsWrapper />
				</StatsContext.Provider>
			),
			container,
		);

		const button = container.querySelector("button");
		expect(button?.hasAttribute("aria-label")).toBe(true);
		expect(button?.hasAttribute("aria-pressed")).toBe(true);
	});

	it("renders with correct structure", () => {
		dispose = render(
			() => (
				<StatsContext.Provider value={mockAudioVideo}>
					<StatsWrapper />
				</StatsContext.Provider>
			),
			container,
		);

		const wrapper = container.querySelector(".stats__wrapper");
		const button = wrapper?.querySelector(".stats__button");

		expect(wrapper).toBeTruthy();
		expect(button).toBeTruthy();
	});

	it("button is clickable", () => {
		dispose = render(
			() => (
				<StatsContext.Provider value={mockAudioVideo}>
					<StatsWrapper />
				</StatsContext.Provider>
			),
			container,
		);

		const button = container.querySelector("button") as HTMLElement;
		expect(button).toBeTruthy();
		expect(button?.tagName).toBe("BUTTON");
	});
});
