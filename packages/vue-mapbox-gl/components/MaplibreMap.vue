<template>
  <div ref="root" v-bind="$attrs" />
  <div v-if="isLoaded">
    <slot />
  </div>
  <div v-else>
    <slot name="loader" />
  </div>
</template>

<script>
  import maplibregl from 'maplibre-gl';

  if (!maplibregl) {
    throw new Error('maplibregl is not installed.');
  }

  const { LngLatBounds, LngLat } = maplibregl;

  /**
   * Component's props definition, we need to declare it outside the component
   * to be able to test the default values and the types.
   * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/
   * @type {object}
   */
  const propsConfig = {
    accessToken: {
      type: String,
      default: 'no-token',
    },
    container: {
      type: [typeof HTMLElement !== 'undefined' && HTMLElement, String],
      default: undefined,
    },
    minZoom: {
      type: Number,
      default: 0,
    },
    maxZoom: {
      type: Number,
      default: 22,
    },
    minPitch: {
      type: Number,
      default: 0,
    },
    maxPitch: {
      type: Number,
      default: 60,
    },
    mapStyle: {
      type: [Object, String],
      required: true,
    },
    hash: {
      type: Boolean,
      default: false,
    },
    interactive: {
      type: Boolean,
      default: true,
    },
    bearingSnap: {
      type: Number,
      default: 7,
    },
    pitchWithRotate: {
      type: Boolean,
      default: true,
    },
    clickTolerance: {
      type: Number,
      default: 3,
    },
    attributionControl: {
      type: Boolean,
      default: true,
    },
    customAttribution: {
      type: [String, Array],
      default: null,
    },
    logoPosition: {
      type: String,
      default: 'bottom-left',
    },
    failIfMajorPerformanceCaveat: {
      type: Boolean,
      default: false,
    },
    preserveDrawingBuffer: {
      type: Boolean,
      default: false,
    },
    antialias: {
      type: Boolean,
      default: false,
    },
    refreshExpiredTiles: {
      type: Boolean,
      default: true,
    },
    maxBounds: {
      type: [LngLatBounds, Array],
      default: undefined,
    },
    scrollZoom: {
      type: [Boolean, Object],
      default: true,
    },
    boxZoom: {
      type: Boolean,
      default: true,
    },
    dragRotate: {
      type: Boolean,
      default: true,
    },
    dragPan: {
      type: [Boolean, Object],
      default: true,
    },
    keyboard: {
      type: Boolean,
      default: true,
    },
    doubleClickZoom: {
      type: Boolean,
      default: true,
    },
    touchZoomRotate: {
      type: [Boolean, Object],
      default: true,
    },
    trackResize: {
      type: Boolean,
      default: true,
    },
    center: {
      type: [LngLat, Array, Object],
      default: () => [0, 0],
    },
    zoom: {
      type: Number,
      default: 0,
    },
    bearing: {
      type: Number,
      default: 0,
    },
    pitch: {
      type: Number,
      default: 0,
    },
    bounds: {
      type: [LngLatBounds, Array],
      default: undefined,
    },
    fitBoundsOptions: {
      type: Object,
      default: null,
    },
    renderWorldCopies: {
      type: Boolean,
      default: true,
    },
    maxTileCacheSize: {
      type: Number,
      default: null,
    },
    localIdeographFontFamily: {
      type: String,
      default: 'sans-serif',
    },
    transformRequest: {
      type: Function,
      default: null,
    },
    collectResourceTiming: {
      type: Boolean,
      default: false,
    },
    fadeDuration: {
      type: Number,
      default: 300,
    },
    crossSourceCollisions: {
      type: Boolean,
      default: true,
    },
    cooperativeGestures: {
      type: Boolean,
    },
    language: {
      type: [String, Array],
      default: null,
    },
    locale: {
      type: Object,
      default: null,
    },
    localFontFamily: {
      type: [Boolean, String],
      default: false,
    },
    minTileCacheSize: {
      type: Number,
      default: null,
    },
    optimizeForTerrain: {
      type: Boolean,
      default: true,
    },
    performanceMetricsCollection: {
      type: Boolean,
      default: true,
    },
    projection: {
      type: [String, Object],
      default: 'mercator',
    },
    testMode: {
      type: Boolean,
      default: false,
    },
    touchPitch: {
      type: [Boolean, Object],
      default: true,
    },
    useWebGL2: {
      type: Boolean,
      default: false,
    },
    worldview: {
      type: String,
      default: null,
    },
  };

  /**
   * All Map events which will be mapped/bounded to the component
   * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#resize
   * @type {Array}
   */
  const events = [
    'boxzoomcancel',
    'boxzoomend',
    'boxzoomstart',
    'click',
    'contextmenu',
    'data',
    'dataloading',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'error',
    'idle',
    'load',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'move',
    'moveend',
    'movestart',
    'pitch',
    'pitchend',
    'pitchstart',
    'remove',
    'render',
    'resize',
    'rotate',
    'rotateend',
    'rotatestart',
    'sourcedata',
    'sourcedataloading',
    'styledata',
    'styledataloading',
    'styleimagemissing',
    'touchcancel',
    'touchend',
    'touchmove',
    'touchstart',
    'webglcontextlost',
    'webglcontextrestored',
    'wheel',
    'zoom',
    'zoomend',
    'zoomstart',
  ];

  export default {
    inheritAttrs: false,
  };
</script>

<script setup>
  import { ref, computed, onMounted, onUnmounted, provide } from 'vue';
  import { useEventsBinding, usePropsBinding } from '../composables/index.js';

  const props = defineProps(propsConfig);
  const emit = defineEmits();

  const map = ref();
  provide('maplibre-map', map);

  const root = ref();
  const isLoaded = ref(false);
  const options = computed(() => {
    const { accessToken, mapStyle: style, ...options } = props;

    // Use current component's element if container is not set
    if (!options.container && root.value) {
      options.container = root.value;
    }

    return { style, ...options };
  });

  useEventsBinding(emit, map, events);
  usePropsBinding(props, map, propsConfig);

  onMounted(() => {
    map.value = new maplibregl.Map(options.value);
    map.value.on('load', () => {
      isLoaded.value = true;
    });

    emit('mb-created', map.value);

    // Maplibre has some resize issues?
    // Create an observer on this object
    // Call resize on the map when we change szie
    const resizeObserver = new ResizeObserver(() => {
      map.value.resize();
    });
    resizeObserver.observe(options.value.container);

    onUnmounted(() => {
      resizeObserver.disconnect();
      map.value.remove();
    });
  });

  defineExpose({ map });
</script>
