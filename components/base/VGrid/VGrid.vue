<script setup lang="ts" generic="Type extends 'cols' | 'rows'">
import type { HTMLAttributes } from 'vue';

type GridCols = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | 'none';
type GridRows = '1' | '2' | '3' | '4' | '5' | '6' | 'none';
type Grid = Type extends 'rows' ? GridRows : GridCols;

type Props = {
    class?: HTMLAttributes['class'];
    grid?: Grid;
    sm?: Grid;
    md?: Grid;
    lg?: Grid;
    xl?: Grid;
    type?: Type;
    gap?: string;
    gapX?: string;
    gapY?: string;
};

const { type = 'cols', ...props } = defineProps<Props>();

const classes = computed(() =>
    cn({
        'grid': true,
        'grid-flow-col': type === 'rows',
        [`grid-cols-${props.grid}`]: !!props.grid && type === 'cols',
        [`sm:grid-cols-${props.sm}`]: !!props.sm && type === 'cols',
        [`md:grid-cols-${props.md}`]: !!props.md && type === 'cols',
        [`lg:grid-cols-${props.lg}`]: !!props.lg && type === 'cols',
        [`xl:grid-cols-${props.xl}`]: !!props.xl && type === 'cols',
        [`grid-rows-${props.grid}`]: !!props.grid && type === 'rows',
        [`sm:grid-rows-${props.sm}`]: !!props.sm && type === 'rows',
        [`md:grid-rows-${props.md}`]: !!props.md && type === 'rows',
        [`lg:grid-rows-${props.lg}`]: !!props.lg && type === 'rows',
        [`xl:grid-rows-${props.xl}`]: !!props.xl && type === 'rows',
        [`gap-${props.gap}`]: !!props.gap,
        [`gap-x-${props.gapX}`]: !!props.gapX,
        [`gap-y-${props.gapY}`]: !!props.gapY,
    }, props.class),
);
</script>

<template>
    <div :class="classes">
        <slot />
    </div>
</template>
