<script setup>
  import { MaplibrePopupDemo } from '../../.vitepress/components/index.js';
</script>

# MaplibrePopup

Display a popup on the map.

- [Maplibre popup documentation](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/)
- [Maplibre popup example](maplibre.org/maplibre-gl-js/docs/examples/popup/)


<h2>Table of contents</h2>

[[toc]]

## Examples

### Basic usage

<ClientOnly>
  <MaplibrePopupDemo />
</ClientOnly>

<<< @/.vitepress/components/MaplibrePopupDemo.vue{10-12}


## Props

### `lngLat`

- Type `[ LngLat, Array, Object ]`
- Required `true`

Center position for the popup.

### `closeButton`

- Type `[ Boolean ]`
- Required `false`
- default `true`

Display a close button on the popup.

### `closeOnClick`

- Type `[ Boolean ]`
- Required `false`
- default `true`

Close the popup on close button click.

### `closeOnMove`

- Type `[ Boolean ]`
- Required `false`
- default `false`

Close the popup when the map moves.

### `anchor`

- Type `[ String ]`
- Required `false`

A string indicating the part of the Popup that should be positioned closest to its coordinate. [See the maplibre-gl documentation for more details.](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/).

### `offset`

- Type `[ Number, Point, Array, Object ]`
- Required `false`
- default `null`

Offset the popup from it's original lngLat position.

### `className`

- Type `[ String ]`
- Required `false`
- default `null`

Add a className to the popup.

### `maxWidth`

- Type `[ String ]`
- Required `false`
- default `240px`

Set a max-width to the popup.

### `renderless`

- Type `[ Boolean ]`
- Required `false`
- default `false`

Do not add the popup to the map on creation.

## Events

### `mb-open`

Emitted when the popup is opened manually or programatically.

**Params**
- `popup`: the object that was opened
- `event`: the Maplibre event object sent by the layer

### `mb-close`

Emitted when the popup is closed manually or programatically.

**Params**
- `popup`: the object that was closed
- `event`: the Maplibre event object sent by the layer

## Slots

### `default`

The default slot will be rendered inside the popup.

