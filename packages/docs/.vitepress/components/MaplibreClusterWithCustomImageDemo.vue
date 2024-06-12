<script setup>
  import { ref } from "vue";
  import { MaplibreMap, MaplibreImage, MaplibreCluster } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);
</script>

<template>
  <MaplibreMap
    style="height: 400px"
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1">
    <MaplibreImage
      id="cat"
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png">
      <MaplibreCluster
        data="/earthquakes.json"
        unclustered-point-layer-type="symbol"
        :unclustered-point-layout="{
          'icon-image': 'cat',
          'icon-size': 0.1,
        }"
        :unclustered-point-paint="null" />
    </MaplibreImage>
  </MaplibreMap>
</template>
