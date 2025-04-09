<script lang="ts" setup>
import type { Props } from '.';
import { textVariants } from '.';

const props = defineProps<Props>();
const variant = computed(() =>
    cn(
        textVariants({
            variant: props.variant,
            weight: props.weight,
            italic: props.italic,
        }),
        props.class,
    ),
);
</script>

<template>
    <component
        :is="as"
        :class="variant"
    >
        <slot />
    </component>
</template>
