<script setup>
  import { MaplibreMap, MaplibreNavigationControl } from '@strher/vue-maplibre-gl';
</script>

<template>
  <MaplibreMap
    style="height: 400px"
    map-style="https://demotiles.maplibre.org/style.json">
    <MaplibreNavigationControl position="bottom-right" />
  </MaplibreMap>
</template>
