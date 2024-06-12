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
    <MaplibreMarker :lng-lat="[0, 0]" popup>
      <template v-slot:popup>
        <p>Hello world!</p>
      </template>
    </MaplibreMarker>
  </MaplibreMap>
</template>

<style scoped>
  p {
    color: #333;
  }
</style>
