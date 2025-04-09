<script setup lang="ts">
import type { TabsRootEmits, TabsRootProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<TabsRootProps>();
const emits = defineEmits<TabsRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <VLibRadixTabsRoot v-bind="forwarded">
        <slot />
    </VLibRadixTabsRoot>
</template>
