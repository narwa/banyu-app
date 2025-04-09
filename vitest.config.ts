import * as path from 'node:path';
import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    resolve: {
        alias: {
            '~': path.resolve(__dirname),
            '~root': path.resolve(__dirname),
        },
    },
    test: {
        environment: 'jsdom',
        coverage: {
            reporter: ['lcov'],
        },
        globals: true,
        setupFiles: ['./tests/setup.ts'],
    },
});
