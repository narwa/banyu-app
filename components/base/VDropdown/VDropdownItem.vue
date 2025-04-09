<script setup lang="ts">
import type { DropdownMenuItemProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardProps } from 'radix-vue';

const props = defineProps<DropdownMenuItemProps & {
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
    <VLibRadixDropdownMenuItem
        v-bind="forwardedProps"
        :class="cn(
            'relative flex cursor-pointer select-none items-center p-2 text-sm outline-none transition-colors text-muted-700 focus:bg-muted-100/80 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            inset && 'pl-8',
            props.class,
        )"
    >
        <slot />
    </VLibRadixDropdownMenuItem>
</template>
