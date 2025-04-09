// @ts-check
import antfu from '@antfu/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    antfu({
        isInEditor: false,
        stylistic: {
            indent: 4,
            quotes: 'single',
            semi: true,
        },
        formatters: true,
        ignores: [
            '.czrc',
            '.versionrc',
            '.husky',
        ],
        typescript: {
            overrides: {
                'ts/consistent-type-definitions': ['error', 'type'],
            },
        },
    }, {
        files: ['**/*.vue'],
        rules: {
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: {
                        max: 1,
                    },
                    multiline: {
                        max: 1,
                    },
                },
            ],
            'vue/no-multiple-template-root': 'off',
        },
    }, {
        rules: {
            'antfu/top-level-function': 'off',
            'node/prefer-global/process': 'off',
            'yaml/indent': ['error', 4],
        },
    }),
);
