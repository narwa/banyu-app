<script setup lang="ts">
import type { DialogCloseProps } from 'radix-vue';

const { asChild = true, ...props } = defineProps<DialogCloseProps>();
</script>

<template>
    <VLibRadixDialogClose
        v-bind="props"
        :as-child="asChild"
    >
        <slot>
            <VButtonIcon
                class="inline-flex"
                data-testid="btn-close"
            >
                <Icon
                    name="mdi:close"
                    class="w-5 h-5"
                />
            </VButtonIcon>
        </slot>
    </VLibRadixDialogClose>
</template>
