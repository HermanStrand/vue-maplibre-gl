import { inject } from 'vue';

/**
 * @typedef {import('vue').Ref} Ref
 */

/**
 * Inject the provided map instance.
 * @returns {{ map: Ref<any> }}
 */
export function useMap() {
  const map = inject('maplibre-map', null);

  return {
    map,
  };
}
