<script setup>
  import { ref } from "vue";
  import { MaplibreMap } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);
</script>

# MaplibreMap

Root component, it is required to have a working map. This component is based on the `Map` class of Maplibre GL, all props are mapped to the `options` passed to the class constructor.

It is recommended to have a look at their [API reference](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/) on the subject.

<h2>Table of contents</h2>

[[toc]]

## Examples

### Basic usage

<ClientOnly>
  <MaplibreMap
    style="margin-top: 1em; height: 400px;"
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1" />
</ClientOnly>

```vue
<script setup>
  import { ref } from 'vue';
  import { MaplibreMap } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);
</script>

<template>
  <MaplibreMap
    style="height: 400px"
    access-token="..."
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1" />
</template>
```

### Accessing the Maplibre instance

You will probably need to use the Maplibre instance to use some of its methods such as `flyTo`, `panTo`, etc. The `MaplibreMap` component emits an `mb-ready` event right after the Maplibre instantiation, with the Maplibre instance of [`Map`](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/) as a parameter. See the example below:

```vue{5,18}
<template>
  <MaplibreMap
    access-token="..."
    map-style="..."
    @mb-created="(mapInstance) => map = mapInstance" />
</template>

<script>
  import 'maplibre-gl/dist/maplibre-gl.css';
  import MaplibrexMap from '@strher/vue-maplibre-map/dist/components/MaplibreMap';

  export default {
    components: {
      MaplibreMap,
    },
    data() {
      return {
        map: null,
      };
    },
  },
</script>
```

## Props

### `mapStyle`

- Type `[ String, Object ]`
- Required `true`

A map style definition, can be a JSON object following the [Maplibre Style specification](https://maplibre.org/maplibre-gl-js/docs/style-spec/) of an URL to such a JSON. This prop is mapped to the `options.style` configuration of the map creation.

### `container`

- Type `[ HTMLElement, String ]`
- Default `undefined`

### `minZoom`

- Type `Number`
- Default `0`

### `maxZoom`

- Type `Number`
- Default `22`

### `minPitch`

- Type: `Number`
- Default: `0`

### `maxPitch`

- Type: `Number`
- Default: `60`

### `hash`

- Type `Boolean`
- Default `false`

### `interactive`

- Type `Boolean`
- Default `true`

### `bearingSnap`

- Type `Number`
- Default `7`

### `pitchWithRotate`

- Type `Boolean`
- Default `true`

### `clickTolerance`

- Type `Number`
- Default `3`

### `attributionControl`

- Type `Boolean`
- Default `true`

### `customAttribution`

- Type `[ String, Array ]`
- Default `null`

### `logoPosition`

- Type `String`
- Default `'bottom-left'`

### `failIfMajorPerformanceCaveat`

- Type `Boolean`
- Default `false`

### `preserveDrawingBuffer`

- Type `Boolean`
- Default `false`

### `antialias`

- Type `Boolean`
- Default `false`

### `refreshExpiredTiles`

- Type `Boolean`
- Default `true`

### `maxBounds`

- Type `[ LngLatBounds, Array ]`
- Default `undefined`

### `scrollZoom`

- Type `[ Boolean, Object ]`
- Default `true`

### `boxZoom`

- Type `Boolean`
- Default `true`

### `dragRotate`

- Type `Boolean`
- Default `true`

### `dragPan`

- Type `[ Boolean, Object ]`
- Default `true`

### `keyboard`

- Type `Boolean`
- Default `true`

### `doubleClickZoom`

- Type `Boolean`
- Default `true`

### `touchZoomRotate`

- Type `[ Boolean, Object ]`
- Default `true`

### `trackResize`

- Type `Boolean`
- Default `true`

### `center`

- Type `[ LngLat, Array, Object ]`
- Default `() => [ 0, 0 ]`

### `zoom`

- Type `Number`
- Default `0`

### `bearing`

- Type `Number`
- Default `0`

### `pitch`

- Type `Number`
- Default `0`

### `bounds`

- Type `[ LngLatBounds, Array ]`
- Default `undefined`

### `fitBoundsOptions`

- Type `Object`
- Default `null`

### `renderWorldCopies`

- Type `Boolean`
- Default `true`

### `maxTileCacheSize`

- Type `Number`
- Default `null`

### `localIdeographFontFamily`

- Type `String`
- Default `'sans-serif'`

### `transformRequest`

- Type `Function`
- Default `null`

### `collectResourceTiming`

- Type `Boolean`
- Default `false`

### `fadeDuration`

- Type `Number`
- Default `300`

### `crossSourceCollisions`

- Type `Boolean`
- Default `true`

### `cooperativeGestures`

- Type: `Boolean`
- Default: `false`

### `language`

- Type: `["auto", String, Array]`
- Default: `null`

### `locale`

- Type: `Object`
- Default: `null`

### `localFontFamily`

- Type: `String`
- Default: `false`

### `minTileCacheSize`

- Type: `Number`
- Default: `null`

### `optimizeForTerrain`

- Type: `Boolean`
- Default: `true`

::: warning
The `optimizeForTerrain` prop will only work with `mapbox-gl@2`, as it has been removed in v3.0.0 of the package (see [release notes](https://github.com/mapbox/mapbox-gl-js/releases/tag/v3.0.0)).
:::

### `performanceMetricsCollection`

- Type: `Boolean`
- Default: `true`

### `projection`

- Type: `ProjectionSpecification`
- Default: `'mercator'`

### `style`

- Type: `[Object, String]`

### `testMode`

- Type: `Boolean`
- Default: `false`

### `touchPitch`

- Type: `[Boolean, Object]`
- Default: `true`

### `useWebGL2`

- Type: `Boolean`
- Default: `false`

### `worldview`

- Type: `String`
- Default: `null`

## Events

### `mb-created`

Emitted when the Mapbox instance has been created.

**Params**

- `map` (`Map`): the Mapbox map instance

### Other events

In addition to the `mb-created` event, all events available on the Mapbox `Map` class are also available on the `MapboxMap` component, prefixed by `mb-`.

- `resize` → `mb-resize`
- `click` → `mb-click`
- ...

See the [API Reference](https://docs.mapbox.com/mapbox-gl-js/api/#map.event:resize) on the subject for more detailed information about each event.

## Slots

### `default`

The `default` slot must contain all other components as the `mapbox-gl` instance is provided by this component to be injected in all its children.

See the documentation on [provide / inject](https://vuejs.org/v2/api/#provide-inject) for more informations.

### `loader`

This slot is displayed while the map is loading.
