// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    ssr: false,

    modules: [
        '@nuxt/eslint',
        '@vueuse/nuxt',
        '@nuxt/icon',
        '@nuxtjs/tailwindcss',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@nuxtjs/google-fonts',
        'radix-vue/nuxt',
        'nuxt-vuefire',
        'nuxt-tiptap-editor',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@vee-validate/nuxt',
        'dayjs-nuxt',
        '@hebilicious/vue-query-nuxt',
        '@nuxt/test-utils/module',
    ],

    vite: {
        define: {
            'process.env.API_BASE_PATH': JSON.stringify(process.env.NUXT_API_BASE_PATH),
            'process.env.API_BASE_URL': JSON.stringify(process.env.NUXT_API_BASE_URL),
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.NUXT_PUBLIC_FIREBASE_API_ID),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID),
            'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
            'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
            'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.NUXT_PUBLIC_FIREBASE_APP_ID),
        },
    },

    nitro: {
        compressPublicAssets: true,
    },

    devServer: {
        port: Number.parseInt(process.env.NUXT_DEVELOPMENT_PORT ?? '8000', 10),
    },

    devtools: {
        enabled: true,
    },

    eslint: {
        config: {
            standalone: false,
        },
    },

    typescript: {
        typeCheck: true,
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false,
            extensions: ['.vue'],
        },
    ],

    icon: {
        customCollections: [
            {
                prefix: 'banyu',
                dir: './assets/icons',
            },
        ],
        clientBundle: {
            scan: true,
            includeCustomCollections: true,
            sizeLimitKb: 0,
        },
    },

    tailwindcss: {
        cssPath: '~/styles/tailwind.scss',
        configPath: '~/tailwind.config',
    },

    image: {
        presets: {
            avatar: {
                modifiers: {
                    format: 'webp',
                    width: 50,
                    height: 50,
                    fit: 'cover',
                    quality: 50,
                },
            },
        },
        quality: 80,
        format: ['webp'],
        screens: {
            'xs': 320,
            'sm': 640,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536,
        },
        densities: [1, 2, 3],
    },

    googleFonts: {
        download: true,
        families: {
            'Lato': [100, 300, 400, 700, 900],
            'Libre Baskerville': {
                wght: [400, 700],
                ital: [400],
            },
        },
    },

    radix: {
        prefix: 'VLibRadix',
    },

    vuefire: {
        auth: {
            enabled: true, // Set to `true` once you have a valid Firebase configuration
        },

        config: {
            apiKey: String(process.env.NUXT_PUBLIC_FIREBASE_API_ID),
            authDomain: String(process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
            projectId: String(process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID),
            storageBucket: String(process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
            messagingSenderId: String(process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
            appId: String(process.env.NUXT_PUBLIC_FIREBASE_APP_ID),
        },
    },

    tiptap: {
        prefix: 'VLibTiptap',
    },

    veeValidate: {
        autoImports: true,
        componentNames: {
            Form: 'VLibFormForm',
            Field: 'VLibFormField',
            FieldArray: 'VLibFormFieldArray',
            ErrorMessage: 'VLibFormErrorMessage',
        },
    },

    dayjs: {
        defaultLocale: 'en',
        plugins: ['relativeTime'],
    },

});
