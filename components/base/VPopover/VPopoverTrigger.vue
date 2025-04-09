<script setup lang="ts">
import type { PopoverTriggerProps } from 'radix-vue';

const props = defineProps<PopoverTriggerProps>();
</script>

<template>
    <VLibRadixPopoverTrigger v-bind="props">
        <slot />
    </VLibRadixPopoverTrigger>
</template>
