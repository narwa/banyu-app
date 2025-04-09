<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type GridCols = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12';

type Props = {
    class?: HTMLAttributes['class'];
    type?: 'grid' | 'align';
    grid?: GridCols;
};

const { type = 'grid', grid = '3', ...props } = defineProps<Props>();

const classes = computed(() =>
    cn({
        grid: type === 'grid',
        [`grid-cols-1`]: !!grid && type === 'grid',
        [`lg:grid-cols-${grid}`]: !!grid && type === 'grid',
        [`description--grid`]: type === 'grid',
        [`description--aligned`]: type === 'align',
    }, props.class),
);
</script>

<template>
    <div
        class="description__group"
        :class="classes"
    >
        <slot />
    </div>
</template>

<style lang="scss">
.description__group {
    @apply lg:gap-x-6 lg:divide-y-0 divide-y divide-muted-100 dark:divide-muted-700;

    & .description__item {
        @apply lg:py-6 py-4;
    }
}

.description__group.description--aligned {
    @apply lg:divide-y;

    & .description__item {
        @apply py-4 lg:grid lg:grid-cols-4 first:pt-0 last:pb-0;
    }

    & .description__text,
    & .description__loading {
        @apply w-full lg:mt-0 lg:col-span-3;
    }
}
</style>
