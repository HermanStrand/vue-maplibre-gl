<script setup>
  import { ref, computed } from 'vue';
  import {
    MaplibreImage,
    MaplibreImages,
    MaplibreLayer,
    MaplibreMap,
    MaplibreMarker,
    MaplibreNavigationControl,
    MaplibrePopup,
    MaplibreCluster,
  } from '@strher/vue-maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';

  const lng = ref(0);
  const lat = ref(0);
  const zoom = ref(1);
  const mapCenter = computed(() => [lng.value, lat.value]);
  const createdHandler = () => console.log('Map created!');

  const eventHandler = console.log.bind(null, '[Event]');

  const iconSources = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Dog_silhouette.svg/429px-Dog_silhouette.svg.png',
      id: 'dog',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png',
      id: 'cat-bis',
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
              icon: 'dog',
            },
            geometry: {
              type: 'Point',
              coordinates: [-55, 0],
            },
          },
          {
            type: 'Feature',
            properties: {
              icon: 'cat-bis',
            },
            geometry: {
              type: 'Point',
              coordinates: [-105, 0],
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
  <div>
    <ClientOnly>
      <MaplibreMap
        style="height: 400px"
        map-style="https://demotiles.maplibre.org/style.json"
        :center="mapCenter"
        :zoom="zoom"
        @mb-created="createdHandler"
        @mb-click="eventHandler">
        <MaplibreImages :sources="iconSources">
          <MaplibreLayer id="pois" :options="layerOptions" />
        </MaplibreImages>
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
                        coordinates: [40, 0],
                      },
                    },
                  ],
                },
              },
              layout: {
                'icon-image': 'cat',
                'icon-size': 0.25,
              },
            }" />
        </MaplibreImage>
        <MaplibreNavigationControl position="bottom-right" />
        <MaplibreMarker :lng-lat="[lng - 30, lat]" @mb-click="eventHandler" />
        <MaplibrePopup :lng-lat="[lng, lat]">
          <p>Hello world !</p>
        </MaplibrePopup>
      </MaplibreMap>
    </ClientOnly>
    <div class="controls">
      <fieldset class="controls__group">
        <legend>Longitude</legend>
        <input type="text" readonly="readonly" :value="lng" />
        <input v-model="lng" type="range" step="1" min="-100" max="100" />
      </fieldset>
      <fieldset class="controls__group">
        <legend>Latitude</legend>
        <input type="text" readonly="readonly" :value="lat" />
        <input v-model="lat" type="range" step="1" min="-90" max="90" />
      </fieldset>
      <fieldset class="controls__group">
        <legend>Zoom</legend>
        <input type="text" readonly="readonly" :value="zoom" />
        <input v-model.number="zoom" type="range" step="0.1" min="0" max="15" />
      </fieldset>
    </div>
  </div>
</template>

<style>
  .controls__group {
    display: flex;
  }
</style>
