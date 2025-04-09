<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    type?: '1' | 'auto' | 'initial' | 'none';
    wrap?: 'wrap' | 'wrap-reverse' | 'nowrap';
    direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    gap?: string;
    gapX?: string;
    gapY?: string;
    spaceX?: string;
    spaceY?: string;
};

const props = defineProps<Props>();

const classes = computed(() =>
    cn({
        flex: true,
        [`flex-${props.type}`]: !!props.type,
        [`flex-${props.wrap}`]: !!props.wrap,
        [`flex-${props.direction}`]: !!props.direction,
        [`justify-${props.justify}`]: !!props.justify,
        [`items-${props.items}`]: !!props.items,
        [`gap-${props.gap}`]: !!props.gap,
        [`gap-x-${props.gapX}`]: !!props.gapX,
        [`gap-y-${props.gapY}`]: !!props.gapY,
        [`space-x-${props.spaceX}`]: !!props.spaceX,
        [`space-y-${props.spaceY}`]: !!props.spaceY,
    }, props.class),
);
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
