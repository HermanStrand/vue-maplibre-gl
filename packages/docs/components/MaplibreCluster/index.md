<script setup>
  import { MaplibreMap, MaplibreCluster } from '@strher/vue-Maplibre-gl';
  import { MaplibreClusterWithPopupDemo, MaplibreClusterWithCustomImageDemo } from '../../.vitepress/components/index.js';
</script>

# MaplibreCluster

Display a cluster on the map with data coming from a GeoJSON source.

- [Maplibre cluster example](maplibre.org/maplibre-gl-js/docs/examples/cluster/)
- [Layer Style Specification](https://maplibre.org/maplibre-style-spec/layers/)


<h2>Table of contents</h2>

[[toc]]

## Examples

### Basic usage

<ClientOnly>
<MaplibreMap
  style="margin-top: 1em; height: 400px;"
  map-style="https://demotiles.maplibre.org/style.json">
  <MaplibreCluster data="/earthquakes.json" />
</MaplibreMap>
</ClientOnly>

```vue {10}
<script setup>
  import { MaplibreMap, MaplibreCluster } from '@strher/vue-Maplibre-gl';
</script>

<template>
  <MaplibreMap
    style="height: 400px"
    map-style="https://demotiles.maplibre.org/style.json">
    <MaplibreCluster data="/earthquakes.json" />
  </MaplibreMap>
</template>
```

### Open popup on feature click

<ClientOnly>
<MaplibreClusterWithPopupDemo style="margin-top: 1em; height: 400px;" />
</ClientOnly>

<<< @/.vitepress/components/MaplibreClusterWithPopupDemo.vue{6-8,10-28,38-47}

  :::warning
  The `:center` prop of the `MaplibreMap` component must be set via a data property (see `mapCenter` in the example above) instead of directly in the template, as it can create unexpected behaviours when clicking on a cluster feature.
  :::

### Custom marker for unclustured points

<ClientOnly>
<MaplibreClusterWithCustomImageDemo style="margin-top: 1em; height: 400px;" />
</ClientOnly>

<<< @/.vitepress/components/MaplibreClusterWithCustomImageDemo.vue{8,12-15,17}

## Props


### `data`

- Type `[ String, Object ]`
- Required `true`

The source of the data for the clustered points, must be a String or an Object of GeoJSON format.


### `clusterMaxZoom`

- Type `Number`
- Default `14`

The max zoom to cluster points on.

### `clusterRadius`

- Type `Number`
- Default `50`

Radius of each cluster when clustering point.

### `clusterMinPoints`

- Type `Number`
- Default `2`

Minimum number of points necessary to form a cluster.

### `clusterProperties`

- Type `Object`
- Default `{}}`

An object defining custom properties on the generated clusters.

### `clustersLayout`

- Type `Object`
- Default `{}`

The layout configuration for the clusters circles layer.

### `clustersPaint`

- Type `Object`
- Default `{ 'circle-color': '#000', 'circle-radius': 40 }`

The paint configuration for the clusters circles layer.

### `clusterCountLayout`

- Type `Object`
- Default `{ 'text-field': [ 'get', 'point_count_abbreviated' ] }`

The layout configuration for the clusters count layer.

### `clusterCountPaint`

- Type `Object`
- Default `{ 'text-color': 'white' }`

The paint configuration for the clusters count layer.

### `unclusteredPointLayerType`

- Type `String`
- Default `'circle'`

The type of the unclustered points layer.

### `unclusteredPointLayout`

- Type `Object`
- Default `{}`

The layout configuration for the unclustered points layer.

### `unclusteredPointPaint`

- Type `Object`
- Default `{ 'circle-color': '#000', 'circle-radius': 4 }`

The paint configuration for the unclustered points layer.

## Events

### `mb-cluster-click`

Emitted when the user clicks on a cluster.

**Params**
- `clusterId`: the ID of the cluster being clicked
- `event`: the Maplibre event object sent by the layer

### `mb-feature-click`

Emitted when the user clicks on a unclustered point (a feature).

**Params**
- `feature`: the feature being clicked on
- `event`: the Maplibre event object sent by the layer

### `mb-feature-mouseenter`

Emitted when the user's mouse enters an unclustered point.

**Params**
- `feature`: the feature being clicked on
- `event`: the Maplibre event object sent by the layer

### `mb-feature-mouseleave`

Emitted when the user's mouse leaves an unclustered point.

**Params**
- `event`: the Maplibre event object sent by the layer
