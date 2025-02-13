import maplibregl from 'maplibre-gl';
import { onMounted, onUnmounted, ref, shallowReactive, unref, watch, nextTick } from 'vue';
import { useMap } from './useMap.js';
import { useEventsBinding } from './useEventsBinding.js';
import { usePropsBinding } from './usePropsBinding.js';

/**
 * Use a Maplibre control.
 * @template {any} T
 * @param   {T}        ControlConstructor  A Maplibre control constructor function.
 * @param   {object}   options
 * @param   {any}      options.propsConfig Props configuration for the component.
 * @param   {an}       options.props       Resolved props of the component.
 * @param   {Function} options.emit        Emit function of the component.
 * @param   {string[]} options.events      List of events for the Maplibre control.
 * @returns {{ control: Ref<InstanceType<T>>, map: Ref<any> }}
 */
export function useControl(ControlConstructor, { propsConfig, props, emit, events = [] }) {
  const { map } = useMap();
  const control = ref();

  if (Array.isArray(events) && events.length) {
    useEventsBinding(emit, control, events);
  }

  if (typeof propsConfig !== 'undefined') {
    usePropsBinding(props, control, propsConfig);
  }

  watch(
    () => props.position,
    (newValue) => {
      if (unref(map)) {
        unref(map).removeControl(unref(control)).addControl(unref(control), newValue);
      }
    }
  );

  onMounted(async () => {
    const ctrl = new ControlConstructor(props);

    if (unref(map)) {
      unref(map).addControl(ctrl, props.position);
    }

    await nextTick();

    // The GeolocateControl setup includes some async tasks, so we need to wait
    // for its _setup property to become true to set it as the control ref value.
    /* eslint-disable no-underscore-dangle */
    if (ControlConstructor === maplibregl.GeolocateControl && !ctrl._setup) {
      const tmpControl = shallowReactive(ctrl);
      const unwatch = watch(tmpControl, (reactiveCtrl) => {
        if (reactiveCtrl._setup) {
          control.value = ctrl;
          unwatch();
        }
      });
    } else {
      control.value = ctrl;
    }
    /* eslint-enable no-underscore-dangle */
  });

  onUnmounted(() => {
    if (unref(control) && unref(map)) {
      unref(map).removeControl(unref(control));
    }
  });

  return {
    control,
    map,
  };
}
