<script setup lang="ts">
import type { TooltipTriggerProps } from 'radix-vue';

const props = defineProps<TooltipTriggerProps>();
</script>

<template>
    <VLibRadixTooltipTrigger
        v-bind="props"
        class="outline-none"
    >
        <slot />
    </VLibRadixTooltipTrigger>
</template>
