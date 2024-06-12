import { watch, computed, useAttrs, unref } from 'vue';

/**
 * @typedef (import('vue').Ref) Ref
 */

const cache = new Map();
const regex = /onMb([A-Z])(.+)/;

/**
 * Get a Maplibre event name from a Vue event name.
 * @param   {string} vueEventName
 * @returns {string}
 */
function getOriginalEvent(vueEventName) {
  if (!cache.has(vueEventName)) {
    cache.set(
      vueEventName,
      vueEventName.replace(regex, (match, $1, $2) => $1.toLowerCase() + $2)
    );
  }

  return cache.get(vueEventName);
}

/**
 * Map a maplibre element's events to a Vue component.
 * @param  {Function} emitFn        The emit function for the current component
 * @param  {Ref<any>} maplibreElement The Maplibre element bound to the component
 * @param  {string[]} [events]      The events to map
 * @param  {string}   [layerId]     The layer on which the events are delegated
 * @returns {void}
 */
export function useEventsBinding(emitFn, maplibreElement, events = [], layerId = null) {
  const attrs = useAttrs();
  const vueEventNames = computed(() =>
    Object.entries(attrs)
      .filter(([name, value]) => name.startsWith('on') && typeof value === 'function')
      .map(([name]) => name)
  );

  const unbindFunctions = new Map();

  /**
   * Unbind events from the given Maplibre element.
   * @param   {string[]} eventNames
   * @returns {void}
   */
  function unbindEvents(eventNames) {
    if (!Array.isArray(eventNames)) {
      return;
    }

    eventNames.forEach((eventName) => {
      const unbindFn = unbindFunctions.get(eventName);
      if (typeof unbindFn === 'function') {
        unbindFn();
      }
    });
  }

  /**
   * Bind Vue events to the given Maplibre element.
   * @param   {string[]} eventNames
   * @returns {void}
   */
  function bindEvents(eventNames) {
    if (!Array.isArray(eventNames)) {
      return;
    }

    eventNames.forEach((eventName) => {
      const originalEvent = getOriginalEvent(eventName);

      if (!events.includes(originalEvent)) {
        return;
      }

      const handler = (...payload) => {
        emitFn(`mb-${originalEvent}`, ...payload);
      };

      // If layerId is not null, all events must be
      // delegated from the map to the given layerId
      if (layerId) {
        unref(maplibreElement).on(originalEvent, layerId, handler);

        unbindFunctions.set(eventName, () => {
          unref(maplibreElement).off(originalEvent, layerId, handler);
        });
      } else {
        unref(maplibreElement).on(originalEvent, handler);

        unbindFunctions.set(eventName, () => {
          unref(maplibreElement).off(originalEvent, handler);
        });
      }
    });
  }

  watch(
    vueEventNames,
    (newVueEventNames, oldVueEventNames) => {
      // Get old event names not in the new event names
      const eventNamesToDelete = Array.isArray(newVueEventNames)
        ? (oldVueEventNames ?? []).filter(
            (oldVueEventName) => !newVueEventNames.includes(oldVueEventName)
          )
        : oldVueEventNames ?? [];

      // Get new event names not in the old event names
      const eventNamesToAdd = Array.isArray(oldVueEventNames)
        ? (newVueEventNames ?? []).filter(
            (newVueEventName) => !oldVueEventNames.includes(newVueEventName)
          )
        : newVueEventNames ?? [];

      if (unref(maplibreElement)) {
        unbindEvents(eventNamesToDelete);
        bindEvents(eventNamesToAdd);
      } else {
        // We need to watch the maplibre element once as it can
        // be null when reaching this part of the code.
        const unwatch = watch(maplibreElement, (newValue) => {
          if (newValue) {
            unbindEvents(eventNamesToDelete);
            bindEvents(eventNamesToAdd);
            unwatch();
          }
        });
      }
    },
    { immediate: true }
  );
}
