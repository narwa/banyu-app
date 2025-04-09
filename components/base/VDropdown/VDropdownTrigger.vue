<script setup lang="ts">
import type { DropdownMenuTriggerProps } from 'radix-vue';
import { useForwardProps } from 'radix-vue';

const props = defineProps<DropdownMenuTriggerProps>();
const forwardedProps = useForwardProps(props);
</script>

<template>
    <VLibRadixDropdownMenuTrigger v-bind="forwardedProps">
        <slot />
    </VLibRadixDropdownMenuTrigger>
</template>
