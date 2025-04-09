<script setup lang="ts">
import type { DropdownMenuGroupProps } from 'radix-vue';

const props = defineProps<DropdownMenuGroupProps>();
</script>

<template>
    <VLibRadixDropdownMenuGroup v-bind="props">
        <slot />
    </VLibRadixDropdownMenuGroup>
</template>
