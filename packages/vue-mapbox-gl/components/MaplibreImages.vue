<template>
  <div>
    <MaplibreImage
      v-for="(source, index) in sources"
      :key="`maplibre-images-${source.id}`"
      v-bind="source"
      @mb-add="addHandler($event, index + 1)" />
    <slot v-if="isReady" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import MaplibreImage from './MaplibreImage.vue';

  const props = defineProps({
    /**
     * A list of sources to add to the map
     * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addimage
     * @see  ./MaplibreImage.vue
     * @type {object}
     */
    sources: {
      type: Array,
      required: true,
    },
  });
  const emit = defineEmits();

  const isReady = ref(false);
  const addedImages = new Map();

  /**
   * Handle the add of a single image.
   * @param {ImageBitmap} image
   * @param {number} index
   */
  function addHandler(image, index) {
    if (!addedImages.has(image.id)) {
      addedImages.set(image.id, image);
      emit('mb-add', image, index, props.sources.length);
    }

    if (addedImages.size === props.sources.length) {
      isReady.value = true;
      emit('mb-ready', addedImages.values());
    }
  }
</script>
