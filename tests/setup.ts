import type { VueWrapper } from '@vue/test-utils';
import { QueryClient } from '@tanstack/vue-query';
import { config, DOMWrapper } from '@vue/test-utils';
import { vi } from 'vitest';

vi.mock('#build/app.config', () => ({
    default: {
        nuxtIcon: {},
    },
}));

vi.mock('#app', () => ({
    useNuxtApp: vi.fn(() => ({
        $api: vi.fn(),
        provide: vi.fn(),
        vueApp: {
            component: vi.fn(),
            directive: vi.fn(),
            use: vi.fn(),
        },
    })),
    defineNuxtPlugin: vi.fn(),
}));

function DataTestIdPlugin(wrapper: VueWrapper) {
    function findByTestId(selector: string) {
        const dataSelector = `[data-testid='${selector}']`;
        const element = wrapper.element.querySelector(dataSelector);
        return new DOMWrapper(element);
    }

    return { findByTestId };
}

config.plugins.VueWrapper.install(DataTestIdPlugin);

config.global.provide = {
    VUE_QUERY_CLIENT: new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    }),
};
