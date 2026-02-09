<p align="center">
	<img height="128px" src="https://github.com/moq-dev/moq/blob/main/.github/logo.svg" alt="Media over QUIC">
</p>

# @moq/hang-ui

[![npm version](https://img.shields.io/npm/v/@moq/hang-ui)](https://www.npmjs.com/package/@moq/hang-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

A TypeScript library for interacting with @moq/hang Web Components. Provides methods to control playback and publish sources, as well as status of the connection.

## Installation

```bash
npm add @moq/hang-ui
# or
pnpm add @moq/hang-ui
yarn add @moq/hang-ui
bun add @moq/hang-ui
```

## Web Components

Currently, there are two Web Components provided by @moq/hang-ui:

- `<hang-watch-ui>`
- `<hang-publish-ui>`

Here's how you can use them (see also @moq/hang-demo for a complete example):

```html
<hang-watch-ui>
    <hang-watch url="<MOQ relay URL>" path="<relay path>" muted>
        <canvas style="width: 100%; height: auto; border-radius: 4px; margin: 0 auto;"></canvas>
    </hang-watch>
</hang-watch-ui>
```

```html
<hang-publish-ui>
	<hang-publish url="<MOQ relay URL>" path="<relay path>">
		<video style="width: 100%; height: auto; border-radius: 4px; margin: 0 auto;" muted autoplay></video>
	</hang-publish>
</hang-publish-ui>
```

## Project Structure
The `@moq/hang-ui` package is organized into modular components and utilities:

```text
src/
├── publish/             # Publishing UI components
│   ├── components/      # UI controls for publishing
│   ├── hooks/           # Custom Solid hooks for publish UI
│   ├── styles/          # CSS styles for publish UI
│   ├── context.tsx      # Context provider for publish state
│   ├── element.tsx      # Main publish UI component
│   └── index.tsx        # Entry point for publish UI
│
├── watch/               # Watching/playback UI components
│   ├── components/      # UI controls for watching
│   ├── hooks/           # Custom Solid hooks for watch UI
│   ├── styles/          # CSS styles for watch UI
│   ├── context.tsx      # Context provider for watch state
│   ├── element.tsx      # Main watch UI component
│   └── index.tsx        # Entry point for watch UI
│
└── shared/              # Shared components and utilities
    ├── components/      # Reusable UI components
	│   ├── button/      # Button component
	│   ├── icon/        # Icon component
	│   └── stats/       # Statistics and monitoring components
    ├── flex.css         # Flexbox utilities
    └── variables.css    # CSS variables and theme

```

### Module Overview

#### **publish/**
Contains all UI components related to media publishing. It provides controls for selecting media sources (camera, screen, microphone, file) and managing the publishing state.

- **MediaSourceSelector**: Allows users to choose their media source
- **PublishControls**: Main control panel for publishing
- **Source buttons**: Individual buttons for camera, screen, microphone, file, and "nothing" sources
- **PublishStatusIndicator**: Displays connection and publishing status

#### **watch/**
Implements the video player UI with controls for watching live streams. Includes playback controls, quality selection, and buffering indicators.

- **WatchControls**: Main control panel for the video player
- **PlayPauseButton**: Play/pause toggle
- **VolumeSlider**: Audio volume control
- **LatencySlider**: Adjust playback latency
- **QualitySelector**: Switch between quality levels
- **FullscreenButton**: Toggle fullscreen mode
- **BufferingIndicator**: Visual feedback during buffering
- **StatsButton**: Toggle statistics panel

#### **shared/**
Common components and utilities used across the package.

- **Button**: Reusable button component with consistent styling
- **Icon**: Icon wrapper component
- **Stats**: Provides real-time statistics monitoring for both audio and video streams. Uses a provider pattern to collect and display metrics.
- **CSS utilities**: Shared styles, variables, and flexbox utilities

---

## Build System & Code Generation

This package uses Custom Elements Manifest (CEM) to automatically generate framework-specific wrappers from Web Component definitions.

### How It Works

**Source files** → **CEM analysis** → **Wrapper generation** → **Framework components**

Web Components in `src/publish/` and `src/watch/` are analyzed to extract their API (props, events, slots), then wrapper generators create framework-specific components with full TypeScript support and documentation.

### Available Scripts

#### `bun run prebuild`

Generates framework wrappers from Web Components:

1. **Analyzes source files** with `cem analyze`
   - Scans Web Components in src/
   - Extracts metadata (attributes, properties, events, slots)
   - Creates `custom-elements.json` manifest

2. **Enhances with JSDoc** from source comments
   - Reads `@tag`, `@summary`, `@description` annotations
   - Extracts `@example` code blocks (HTML, React, etc.)
   - Merges enhanced metadata into the manifest

3. **Generates wrappers** for enabled frameworks
   - Creates `src/wrappers/react/index.ts` with typed React components
   - Includes complete JSDoc documentation with examples
   - Adds TypeScript definitions for JSX intrinsic elements
   - **Note**: This file is auto-generated and not committed to git (see `.gitignore`)

#### `bun run build`

Compiles and bundles the entire package:

1. Cleans previous build artifacts
2. Runs Vite build with:
   - JavaScript bundling (Web Components + framework wrappers)
   - **Automatic TypeScript declaration generation** via `vite-plugin-dts`
3. Copies `custom-elements.json` to dist/
4. Updates package.json exports with proper type paths

### Scripts Directory Structure

```
scripts/
├── generate-wrappers.ts  # Main entry point - orchestrates all generators
├── generators/
│   └── react.ts          # React wrapper generator
└── utils/
    ├── manifest.ts       # CEM loader and JSDoc metadata extraction
    ├── codegen.ts        # Code generation utilities (JSDoc, formatting)
    └── types.ts          # TypeScript type definitions
```

### React Wrappers

React components are automatically generated and exported from `@moq/hang-ui/react`:

```typescript
import { HangWatchUI, HangPublishUI } from '@moq/hang-ui/react';
import '@moq/hang/watch/element';
import '@moq/hang-ui/watch';

export function VideoPlayer() {
  return (
    <HangWatchUI>
      <hang-watch url="..." path="...">
        <canvas />
      </hang-watch>
    </HangWatchUI>
  );
}
```

✨ **Full TypeScript support** - Components include JSDoc with examples and proper type definitions.

### Adding a New Framework Wrapper

#### 1. Create Generator

Create `scripts/generators/vue.ts`:

```typescript
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { extractCustomElements, loadManifest, tagNameToComponentName } from "../utils/manifest";
import { formatCode, generateJSDoc } from "../utils/codegen";
import type { CustomElement } from "../utils/types";

function generateVueComponent(element: CustomElement): string {
  const componentName = tagNameToComponentName(element.tagName);
  const jsDoc = generateJSDoc(
    element.summary,
    element.description,
    element.slots,
    element.events,
    element.attributes,
    element.properties,
    element.examples,
  );

  return `${jsDoc}
export const ${componentName} = defineComponent({
  name: '${componentName}',
  template: '<${element.tagName}><slot /></${element.tagName}>',
});
`;
}

export function generateVueWrappers(basePath: string = process.cwd()): void {
  console.log("\n🔧 Generating Vue wrappers...");

  const manifest = loadManifest(basePath);
  const elements = extractCustomElements(manifest);

  if (elements.length === 0) return;

  const components = elements.map(generateVueComponent).join("\n");
  const output = `import { defineComponent } from 'vue';\n\n${components}`;

  const outputDir = join(basePath, "src", "wrappers", "vue");
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "index.ts"), formatCode(output));

  console.log(`✅ Generated ${elements.length} Vue wrapper(s)`);
}
```

#### 2. Register Generator

In `scripts/generate-wrappers.ts`:

```typescript
import { generateVueWrappers } from "./generators/vue";

const generators: Generator[] = [
  { name: "React", fn: generateReactWrappers, enabled: true },
  { name: "Vue", fn: generateVueWrappers, enabled: true },
];
```

#### 3. Update Build Configuration

**vite.config.ts** - Add entry point:
```typescript
entry: {
  "wrappers/vue/index": resolve(__dirname, "src/wrappers/vue/index.ts"),
}
```

**package.json** - Add export:
```json
{
  "exports": {
    "./vue": {
      "types": "./wrappers/vue/index.d.ts",
      "default": "./src/wrappers/vue/index.ts"
    }
  }
}
```

#### 4. Run Generation

```bash
bun run prebuild    # Generates src/wrappers/vue/index.ts
bun run build       # Compiles and creates dist/
```

### JSDoc Annotations

Add metadata to Web Components with JSDoc:

```typescript
/**
 * @tag hang-watch-ui
 * @summary Watch video stream with full UI controls
 * @description Complete player UI for MOQ live streams
 *
 * @example HTML
 * ```html
 * <hang-watch-ui>
 *   <hang-watch url="wss://relay.example.com">
 *     <canvas></canvas>
 *   </hang-watch>
 * </hang-watch-ui>
 * ```
 *
 * @example React
 * ```tsx
 * <HangWatchUI>
 *   <hang-watch url="wss://relay.example.com">
 *     <canvas />
 *   </hang-watch>
 * </HangWatchUI>
 * ```
 */
```

**Supported tags:** `@tag`, `@summary`, `@description`, `@slot`, `@example <Label>`

---
