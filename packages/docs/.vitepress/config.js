import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'Vue 3 Maplibre GL',
  description: 'A small library of Vue components for maplibre-gl',
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    toc: { level: [2] },
  },
  themeConfig: {
    logo: '/logo.png',
    footer: {
      message: 'Released under the GPL 3.0 License.',
      copyright: 'Copyright © 2019-present Studio Meta',
    },
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/strher/vue-maplibre-gl/edit/master/packages/docs/:path',
      text: 'Edit this page on GitHub',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/strher/vue-maplibre-gl' }],
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction/' },
      {
        text: 'Components',
        items: [
          { text: 'MaplibreMap', link: '/components/MaplibreMap/' },
          { text: 'MaplibreMarker', link: '/components/MaplibreMarker/' },
          { text: 'MaplibreCluster', link: '/components/MaplibreCluster/' },
          { text: 'MaplibreImage', link: '/components/MaplibreImage/' },
          { text: 'MaplibreImages', link: '/components/MaplibreImages/' },
          { text: 'MaplibreLayer', link: '/components/MaplibreLayer/' },
          { text: 'MaplibreNavigationControl', link: '/components/MaplibreNavigationControl/' },
          { text: 'MaplibrePopup', link: '/components/MaplibrePopup/' },
          { text: 'MaplibreSource', link: '/components/MaplibreSource/' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Guide',
        collapsible: true,
        items: [
          { text: 'Introduction', link: '/guide/introduction/' },
          { text: 'Installation', link: '/guide/installation/' },
          { text: 'Usage', link: '/guide/usage/' },
        ],
      },
      {
        text: 'Components',
        collapsible: true,
        items: [
          { text: 'MaplibreMap', link: '/components/MaplibreMap/' },
          { text: 'MaplibreMarker', link: '/components/MaplibreMarker/' },
          { text: 'MaplibreCluster', link: '/components/MaplibreCluster/' },
          { text: 'MaplibreImage', link: '/components/MaplibreImage/' },
          { text: 'MaplibreImages', link: '/components/MaplibreImages/' },
          { text: 'MaplibreLayer', link: '/components/MaplibreLayer/' },
          { text: 'MaplibreNavigationControl', link: '/components/MaplibreNavigationControl/' },
          { text: 'MaplibrePopup', link: '/components/MaplibrePopup/' },
          { text: 'MaplibreSource', link: '/components/MaplibreSource/' },
        ],
      },
    ],
  },
});
