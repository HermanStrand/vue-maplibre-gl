<script setup>
  import { MaplibreNavigationControlDemo } from '../../.vitepress/components/index.js';
</script>

# MaplibreNavigationControl

Display navigation controls on the map, including two zoom buttons + - and a compass button to rotate the map.

- [Maplibre navigation controls documentation](https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl/)
- [Maplibre navigation controls example](maplibre.org/maplibre-gl-js/docs/examples/navigation/)


<h2>Table of contents</h2>

[[toc]]

## Examples

### Basic usage

<ClientOnly>
  <MaplibreNavigationControlDemo style="margin-top: 1em;" />
</ClientOnly>

<<< @/.vitepress/components/MaplibreNavigationControlDemo.vue{10}

## Props

### `position`

- Type: `String`
- Default: `top-right`

The position for the navigation control.

### `showCompass`

- Type: `Boolean`
- Default: `true`

Show the compass button with the navigation control.

### `showZoom`

- Type: `Boolean`
- Default: `true`

Show the zoom button with the navigation control.

### `visualizePitch`

- Type: `Boolean`
- Default: `false`

If `true` the pitch is visualized by rotating Y-axis of compass.
