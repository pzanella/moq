// CSS inline
declare module "*.css?inline" {
	const css: string;
	export default css;
}

// SVG raw
declare module "*.svg?raw" {
	const svg: string;
	export default svg;
}

// Workers
declare module "*?worker&url" {
	const workerUrl: string;
	export default workerUrl;
}

// Fallback for general URLs
declare module "*?url" {
	const url: string;
	export default url;
}
