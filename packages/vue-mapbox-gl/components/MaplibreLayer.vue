<template>
  <div :id="id" />
</template>

<script>
  const propsConfig = {
    /**
     * Id of the layer
     * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addlayer
     * @type {string}
     */
    id: {
      type: String,
      required: true,
    },
    /**
     * Options for the layer
     * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addlayer
     * @see  https://maplibre.org/maplibre-style-spec/layers/
     * @type {object}
     */
    options: {
      type: Object,
      default: () => {},
    },
    /**
     * The ID of an existing layer to insert the new layer before.
     * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#addlayer
     * @type {string}
     */
    beforeId: {
      type: String,
      default: undefined,
    },
  };

  /**
   * All Map events which will be mapped/bounded to the component
   * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#ontype-layer-listener
   * @type {Array}
   */
  const events = [
    'mousedown',
    'mouseup',
    'click',
    'dblclick',
    'mousemove',
    'mouseenter',
    'mouseleave',
    'mouseover',
    'mouseout',
    'contextmenu',
    'touchstart',
    'touchend',
    'touchcancel',
  ];
</script>

<script setup>
  import { onMounted, onUnmounted, computed, unref } from 'vue';
  import { useEventsBinding, useMap } from '../composables/index.js';

  const props = defineProps(propsConfig);
  const emit = defineEmits();

  const { map } = useMap();
  const options = computed(() => {
    const opts = { ...props.options, id: props.id };

    if (opts.paint === null || opts.paint === undefined) {
      delete opts.paint;
    }

    if (opts.layout === null || opts.layout === undefined) {
      delete opts.layout;
    }

    return opts;
  });

  useEventsBinding(emit, map, events, props.id);

  /**
   * Remove the layer.
   */
  function removeLayer() {
    if (typeof unref(map).getLayer(props.id) !== 'undefined') {
      unref(map).removeLayer(props.id);
    }
  }

  /**
   * Remove the source.
   */
  function removeSource() {
    if (typeof unref(map).getSource(props.id) !== 'undefined') {
      unref(map).removeSource(props.id);
    }
  }

  onMounted(() => {
    removeLayer();
    removeSource();
    unref(map).addLayer(unref(options), props.beforeId);
  });

  onUnmounted(() => {
    removeLayer();
    removeSource();
  });
</script>
