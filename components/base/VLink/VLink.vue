<script lang="ts" setup>
import type { Props } from '.';
import { NuxtLink } from '#components';

const props = defineProps<Props>();

const delegatedProps = computed(() => {
    const { prefetch, noPrefetch, ...rest } = props;

    if (prefetch && noPrefetch) {
        console.warn(
            '[VLink] `prefetch` and `noPrefetch` cannot be used together. `noPrefetch` will be ignored.',
        );
    }

    return {
        ...rest,
        prefetch: prefetch || undefined,
        noPrefetch: prefetch ? false : noPrefetch,
    };
});
</script>

<template>
    <VButton
        :as="NuxtLink"
        v-bind="delegatedProps"
    >
        <slot />
    </VButton>
</template>
