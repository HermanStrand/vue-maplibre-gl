# Usage

Import directly the pieces you need as well as the stylesheet for Mapbox GL:

```vue
<script setup>
  import { MaplibreMap, MaplibreMarker } from '@strher/vue-maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
</script>

<template>
  <MaplibreMap access-token="...">
    <MaplibreMarker position="[0, 0]" />
  </MaplibreMap>
</template>
```

If you need to access to the Maplibre `map` instance, you can get it via the `mb-created` event on the `MaplibreMap` component which is emitted when the map has been instantiated.

```vue {5,11}
<script setup>
  import { ref } from 'vue';
  import { MaplibreMap } from '@strher/vue-maplibre-gl';

  const map = ref();
</script>

<template>
  <MaplibreMap
    access-token="..."
    @mb-created="(maplibreInstance) => map = maplibreInstance" />
</template>
```

Or you can add a ref to the `MaplibreMap` component and access it with the `map` property:

```vue
<script setup>
  import { ref } from 'vue';
  import { MaplibreMap } from '@strher/vue-maplibre-gl';

  const maplibreMap = ref();
  const map = computed(() => maplibreMap.value.map);
</script>

<template>
  <MaplibreMap
    ref="maplibreMap"
  />
</template>
```
