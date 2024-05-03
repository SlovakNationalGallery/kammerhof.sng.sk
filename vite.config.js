import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'


const publicIcons = [
    { src: '/favicon.ico' },
    { src: '/android-chrome-192x192.png' },
    { src: '/android-chrome-512x512.png' },
    { src: '/apple-touch-icon.png' },
    { src: '/favicon-16x16.png' },
    { src: '/favicon-32x32.png' },
    { src: '/safari-pinned-tab.svg' },
]

// Define any additional images in the Laravel public folder that are not
// packaged via Vite and that we want to be available offline. (For example,
// an image used in a meta og:image tag). The src is a web URL relative to
// the public root.
// Use the format { src: '' } for entries
const additionalImages = []

export default defineConfig({
    plugins: [
        VitePWA({
            // Make the PWA plugin build to the same place as laravel/vite-plugin
            buildBase: '/build/',

            // Define the scope and the base so that the PWA can run from the
            // root of the domain, even though the files live in /build.
            // This requires the service worker to be served with
            // a header `Service-Worker-Allowed: /` to authorise it.
            // @see server.php
            scope: '/',
            base: '/',
            registerType: 'prompt',
            devOptions: {
                enabled: false,
            },
            includeAssets: [],

            workbox: {
                // Add all the assets built by Vite into the public/build/assets
                // folder to the SW cache.
                globPatterns: ['**/*.{js,css,html,ico,jpg,jpeg,png,svg,webp,woff,woff2,ttf,eot,webmanifest}'],

                // Define the root URL as the entrypoint for the offline app.
                // vue-router can then takes over and shows the correct page
                // if you are using it.
                navigateFallback: '/',

                // Stops various paths being intercepted by the service worker
                // if they're not available offline. Telescope is a good
                // example, if you are using that.
                navigateFallbackDenylist: [/^\/telescope/],

                // Add some explicit URLs to the SW precache. This helps us
                // work with the laravel/vite-plugin setup.
                additionalManifestEntries: [
                    // Cache the root URL to get hold of the PWA HTML entrypoint
                    // defined in welcome.blade.php. Ref:
                    // https://github.com/vite-pwa/vite-plugin-pwa/issues/431#issuecomment-1703151065
                    { url: '/', revision: `${Date.now()}` },

                    // Cache the other offline icons defined above
                    ...publicIcons.map((i) => {
                        return { url: i.src, revision: `${Date.now()}` }
                    }),

                    // Cache any additional images defined above
                    ...additionalImages.map((i) => {
                        return { url: i.src, revision: `${Date.now()}` }
                    }),
                ],

                // Ensure the JS build does not get dropped from the cache.
                // This allows it to be as big as 3MB
                maximumFileSizeToCacheInBytes: 3000000,
            },
        }),
        vue({
            template: {
                transformAssetUrls: {
                    // The Vue plugin will re-write asset URLs, when referenced
                    // in Single File Components, to point to the Laravel web
                    // server. Setting this to `null` allows the Laravel plugin
                    // to instead re-write asset URLs to point to the Vite
                    // server instead.
                    base: null,

                    // The Vue plugin will parse absolute URLs and treat them
                    // as absolute paths to files on disk. Setting this to
                    // `false` will leave absolute URLs un-touched so they can
                    // reference assets in the public directory as expected.
                    includeAbsolute: false,
                },
            },
        }),
        laravel(['resources/css/app.css', 'resources/js/app.js']),
        {
            refresh: true,
        },
    ],
})
