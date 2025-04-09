<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
};
const props = defineProps<Props>();
</script>

<template>
    <span :class="cn('ml-auto text-xs tracking-widest text-muted-foreground', props.class)">
        <slot />
    </span>
</template>
