<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
};
const props = defineProps<Props>();
const containerClass = computed(() =>
    cn(
        'container',
        props.class,
    ),
);
</script>

<template>
    <div :class="containerClass">
        <slot />
    </div>
</template>
