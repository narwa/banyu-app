<script setup lang="ts">
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = withDefaults(
    defineProps<DropdownMenuContentProps & { class?: HTMLAttributes['class'] }>(),
    {
        sideOffset: 4,
    },
);
const emits = defineEmits<DropdownMenuContentEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VLibRadixDropdownMenuPortal>
        <VLibRadixDropdownMenuContent
            v-bind="forwarded"
            :class="cn('z-50 min-w-48 overflow-hidden rounded-lg border bg-white border-muted-200  p-3 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', props.class)"
        >
            <slot />
        </VLibRadixDropdownMenuContent>
    </VLibRadixDropdownMenuPortal>
</template>
