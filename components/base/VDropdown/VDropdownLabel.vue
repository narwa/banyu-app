<script setup lang="ts">
import type { DropdownMenuLabelProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardProps } from 'radix-vue';

const props = defineProps<DropdownMenuLabelProps & {
    class?: HTMLAttributes['class'];
    inset?: boolean;
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <VLibRadixDropdownMenuLabel
        v-bind="forwardedProps"
        :class="cn('px-2 py-1.5 text-sm font-medium text-muted-800', inset && 'pl-8', props.class)"
    >
        <slot />
    </VLibRadixDropdownMenuLabel>
</template>
