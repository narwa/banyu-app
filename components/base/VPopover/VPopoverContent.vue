<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';

type Props = PopoverContentProps & {
    class?: HTMLAttributes['class'];
};

defineOptions({
    inheritAttrs: false,
});

const { align = 'center', sideOffset = 10, ...props } = defineProps<Props>();

const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VLibRadixPopoverPortal>
        <VLibRadixPopoverContent
            v-bind="{ ...forwarded, ...$attrs }"
            :side-offset="sideOffset"
            :align="align"
            :class="
                cn(
                    'z-50 w-72 p-4 rounded-lg bg-white border border-muted-200 dark:bg-muted-700 dark:border-muted-600 shadow-xl shadow-muted-300/30 dark:shadow-muted-800/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    props.class,
                )
            "
        >
            <slot />
        </VLibRadixPopoverContent>
    </VLibRadixPopoverPortal>
</template>
