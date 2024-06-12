<template>
  <div>
    <div ref="contentRef">
      <slot />
    </div>
    <MaplibrePopup v-if="hasPopup" ref="popupRef" v-bind="popupOptions">
      <slot name="popup" />
    </MaplibrePopup>
  </div>
</template>

<script>
  import maplibregl from 'maplibre-gl';

  const { Marker, Point } = maplibregl;

  /**
   * Component's props definition, we need to declare it outside the component
   * to be able to test the default values and the types.
   * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/
   * @type {object}
   */
  const propsConfig = {
    lngLat: {
      type: Array,
      required: true,
    },
    popup: {
      type: [Object, Boolean],
      default: false,
      bind: false,
    },
    element: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      default: null,
    },
    offset: {
      type: [Point, Array],
      default: null,
    },
    anchor: {
      type: String,
      default: 'center',
    },
    color: {
      type: String,
      default: null,
    },
    scale: {
      type: Number,
      default: 1,
    },
    draggable: {
      type: Boolean,
      default: false,
    },
    rotation: {
      type: Number,
      default: 0,
    },
    pitchAlignment: {
      type: String,
      default: 'auto',
    },
    rotationAlignment: {
      type: String,
      default: 'auto',
    },
  };

  /**
   * All Map events which will be mapped/bounded to the component
   * @see  https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/#events
   * @type {Array}
   */
  const events = ['dragstart', 'drag', 'dragend'];
</script>

<script setup>
  import { computed, ref, onMounted, onUnmounted, useSlots } from 'vue';
  import { useMap, useEventsBinding, usePropsBinding } from '../composables/index.js';
  import MaplibrePopup from './MaplibrePopup.vue';

  const props = defineProps(propsConfig);
  const emit = defineEmits();
  const slots = useSlots();

  const marker = ref();
  const contentRef = ref();
  const popupRef = ref();
  const hasPopup = computed(() => typeof slots.popup !== 'undefined');

  const popupInstance = computed(() => (hasPopup.value ? popupRef.value.popup : null));

  const popupOptions = computed(() => ({
    lngLat: props.lngLat,
    ...(props.popup ? props.popup : {}),
    renderless: true,
  }));

  const options = computed(() => {
    const { lngLat, popup, ...options } = props;

    // Use current component's element if container is not set
    if (slots.default) {
      options.element = contentRef.value;
    }

    return options;
  });

  usePropsBinding(props, marker, propsConfig);
  useEventsBinding(emit, marker, events);

  onMounted(() => {
    const { map } = useMap();
    marker.value = new Marker(options.value).setLngLat(props.lngLat).addTo(map.value);

    if (hasPopup.value) {
      marker.value.setPopup(popupInstance.value);
    }
  });

  onUnmounted(() => {
    if (marker.value) {
      marker.value.remove();
    }
  });
</script>
