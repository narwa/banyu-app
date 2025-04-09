<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';

type Props = ComboboxItemProps & {
    class?: HTMLAttributes['class'];
};

const props = defineProps<Props>();
const emits = defineEmits<ComboboxItemEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VLibRadixComboboxItem
        v-bind="forwarded"
        :class="cn('relative flex items-center cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-muted-100/80 dark:data-[highlighted]:bg-muted-900 data-[highlighted]:text-muted-600 dark:data-[highlighted]:text-muted-300 data-[disabled]:pointer-events-none data-[disabled]:opacity-50', props.class)"
    >
        <slot />
    </VLibRadixComboboxItem>
</template>
