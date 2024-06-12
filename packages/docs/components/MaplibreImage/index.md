<script setup>
  import { ref } from "vue";
  import { MaplibreMap, MaplibreImage, MaplibreLayer } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);
</script>

# MaplibreImage

Add an image to be used used in `icon-image`, `background-pattern`, `fill-pattern`, and `line-pattern`.

- [`addImage` documentation](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage)
- [Add an icon to the map example](maplibre.org/maplibre-gl-js/docs/examples/add-image/)
- [Add a generated icon to the map](maplibre.org/maplibre-gl-js/docs/examples/add-image-generated/)


<h2>Table of contents</h2>

[[toc]]

## Examples

### Add an icon to the map

<ClientOnly>
  <MaplibreMap
    style="margin-top: 1em; height: 400px;"
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1">
  <MaplibreImage
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png"
    id="cat">
    <MaplibreLayer
      id="points"
      :options="{
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [0, 0]
                }
              }
            ]
          }
        },
        layout: {
          'icon-image': 'cat',
          'icon-size': 0.25
        }
      }" />
  </MaplibreImage>
  </MaplibreMap>
</ClientOnly>

```vue {12-14}
<script setup>
  import { ref } from "vue";
  import { MaplibreMap, MaplibreImage } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);
</script>

<template>
  <MaplibreMap
    style="height: 400px"
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1">
    <MaplibreImage
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png"
      id="cat" />
  </MaplibreMap>
</template>
```

## Props

### `id`

- Type `String`
- Required `true`

The ID of the image. This will be used to refer to this image.

### `src`

- Type `[ String, HTMLImageElement, ImageData, Object ]`
- Required `true`

The image as String, an HTMLImageElement, ImageData, or object with width, height, and data properties with the same format as ImageData.

### `options`

- Type `Object`
- Default `{ pixelRatio: 1, sdf: false }`

This options object will be passed directly to the `addImage` method.

## Events

### `add`

Emitted when the image has been added to the map with the [`addImage`](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage) method.

**Properties**

- `image` _(`Object`)_ The image's informations
- `image.id` _(`String`)_ The ID given to the image
- `image.src` _(`HTMLImageElement | ImageData | Object`)_ The generated source of the image when the given source is a string; the given source otherwise
- `image.options` _(`Object`)_ The options object used with the `addImage` method


## Slots

### `default`

The default slot will be rendered _after_ the image has been added to the map — when the `add` event is emitted.
