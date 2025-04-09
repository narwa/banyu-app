<script setup lang="ts">
import type { ComboboxSeparatorProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

type Props = ComboboxSeparatorProps & {
    class?: HTMLAttributes['class'];
};

const props = defineProps<Props>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <VLibRadixComboboxSeparator
        v-bind="delegatedProps"
        :class="cn('-mx-1 h-px border-t border-muted-200 dark:border-muted-800', props.class)"
    >
        <slot />
    </VLibRadixComboboxSeparator>
</template>
