<script setup>
  import { ref } from "vue";
  import { MaplibreMap, MaplibreMarker } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);
</script>

<template>
  <MaplibreMap
    style="height: 400px"
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1">
    <MaplibreMarker :lng-lat="[0, 0]">
      <p class="custom-marker">Hello world!</p>
    </MaplibreMarker>
  </MaplibreMap>
</template>

<style scoped>
  .custom-marker {
    padding: 1em;
    background-color: #fff;
    border-radius: 5px;
  }
</style>
