<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<PopoverRootProps>();
const emits = defineEmits<PopoverRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <VLibRadixPopoverRoot v-bind="forwarded">
        <slot />
    </VLibRadixPopoverRoot>
</template>
