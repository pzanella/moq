import { createContext, useContext } from "solid-js";
import type { ProviderProps } from "./types";

/**
 * Context providing stream sources to child components
 */
export const StatsContext = createContext<ProviderProps>({});

/**
 * Hook to access stream sources from context
 * @returns Stream properties (audio and video)
 */
export const useMetrics = () => {
	const context = useContext(StatsContext);
	if (!context || (!context.audio && !context.video)) {
		throw new Error("useMetrics must be used inside Stats when both audio and video are available");
	}
	return context;
};
