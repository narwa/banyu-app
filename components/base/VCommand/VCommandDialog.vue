<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'radix-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <VDialog
        v-bind="forwarded"
        content-class="p-0"
    >
        <VCommand>
            <slot />
        </VCommand>
    </VDialog>
</template>
