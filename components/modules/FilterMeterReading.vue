<script setup lang="ts">
import { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';

const emits = defineEmits<{
    reject: [value: boolean];
    resolve: [value: boolean | string];
}>();

const params = reactive(new MeterReadingPaginationSearchParams());
</script>

<template>
    <VDialog
        size="2xl"
        open
        hide-close
        @update:open="emits('resolve', false)"
    >
        <VFlex class="flex items-start py-2 px-4 w-full">
            {{ params }}
        </VFlex>
    </VDialog>
</template>
