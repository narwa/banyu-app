<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<DropdownMenuRootProps>();
const emits = defineEmits<DropdownMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <VLibRadixDropdownMenuRoot v-bind="forwarded">
        <slot />
    </VLibRadixDropdownMenuRoot>
</template>
