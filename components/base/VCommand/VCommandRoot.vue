<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';

type Props = ComboboxRootProps & {
    class?: HTMLAttributes['class'];
};

const { open = true, ...props } = defineProps<Props>();

const emits = defineEmits<ComboboxRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VLibRadixComboboxRoot
        v-bind="forwarded"
        :open="open"
        :class="cn('flex h-full w-full flex-col overflow-hidden bg-white dark:bg-muted-950', props.class)"
    >
        <slot />
    </VLibRadixComboboxRoot>
</template>
