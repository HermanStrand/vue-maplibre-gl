<script setup>
  import { ref, nextTick } from 'vue';
  import { MaplibreMap, MaplibrePopup, MaplibreCluster } from '@strher/vue-maplibre-gl';

  const mapCenter = ref([0, 0]);
  const isOpen = ref(false);
  const position = ref([0, 0]);
  const content = ref();

  async function openPopup({ geometry, properties }) {
    await nextTick();
    position.value = [...geometry.coordinates];
    isOpen.value = true;

    /**
     * Maplibre GL convert's properties values to JSON, so we need to parse them
     * to retreive any complex data structure such as arrays and objects.
     */
    content.value = Object.fromEntries(
      Object.entries(properties).map(([key, value]) => {
        try {
          return [key, JSON.parse(value)];
        } catch (err) {
          // Silence is golden.
        }

        return [key, value];
      })
    );
  }
</script>

<template>
  <MaplibreMap
    map-style="https://demotiles.maplibre.org/style.json"
    :center="mapCenter"
    :zoom="1">
    <MaplibrePopup
      v-if="isOpen"
      :key="position.join('-')"
      :lng-lat="position"
      anchor="bottom"
      @mb-close="() => (isOpen = false)">
      <pre>{{ content }}</pre>
    </MaplibrePopup>
    <MaplibreCluster data="/earthquakes.json" @mb-feature-click="openPopup" />
  </MaplibreMap>
</template>
