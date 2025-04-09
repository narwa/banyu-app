import VueDOMPurifyHTML from 'vue-dompurify-html';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueDOMPurifyHTML, {
        default: {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['allow', 'frameborder', 'src', 'width', 'height', 'style'],
        },
        namedConfigurations: {
            plaintext: {
                USE_PROFILES: { html: false },
            },
        },
    });
});
