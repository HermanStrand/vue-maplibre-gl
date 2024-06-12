<script setup>
  import { ref } from "vue";
  import { MaplibreMap, MaplibreImages, MaplibreLayer } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);

  const images = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Dog_silhouette.svg/429px-Dog_silhouette.svg.png',
      id: 'dog',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
      id: 'cat',
    },
  ];

  const layerOptions = {
    type: 'symbol',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              icon: 'cat',
            },
            geometry: {
              type: 'Point',
              coordinates: [-25, 0],
            },
          },
          {
            type: 'Feature',
            properties: {
              icon: 'dog',
            },
            geometry: {
              type: 'Point',
              coordinates: [25, 0],
            },
          },
        ],
      },
    },
    layout: {
      'icon-image': ['get', 'icon'],
      'icon-size': 0.25,
    },
  };
</script>

<template>
  <MaplibreMap
    style="height: 400px"
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1">
    <MaplibreImages :sources="images">
      <MaplibreLayer id="pois" :options="layerOptions" />
    </MaplibreImages>
  </MaplibreMap>
</template>
