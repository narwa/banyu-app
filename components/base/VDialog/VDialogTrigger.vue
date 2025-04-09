<script setup lang="ts">
import type { DialogTriggerProps } from 'radix-vue';

const props = defineProps<DialogTriggerProps>();
</script>

<template>
    <VLibRadixDialogTrigger v-bind="props">
        <slot />
    </VLibRadixDialogTrigger>
</template>
