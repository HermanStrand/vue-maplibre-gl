<script setup>
  import { MaplibreMap, MaplibrePopup } from '@strher/vue-maplibre-gl';
</script>

<template>
  <MaplibreMap
    style="margin-top: 1em; height: 400px"
    map-style="https://demotiles.maplibre.org/style.json">
    <MaplibrePopup :lng-lat="[10, 10]">
      <p>Hello world !</p>
    </MaplibrePopup>
  </MaplibreMap>
</template>
