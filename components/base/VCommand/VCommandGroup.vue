<script setup lang="ts">
import type { ComboboxGroupProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

type Props = ComboboxGroupProps & {
    class?: HTMLAttributes['class'];
    heading?: string;
};

const props = defineProps<Props>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <VLibRadixComboboxGroup
        v-bind="delegatedProps"
        :class="cn('p-4', props.class)"
    >
        <VLibRadixComboboxLabel
            v-if="heading"
            class="text-[10px] uppercase text-muted-500 dark:text-muted-400"
        >
            {{ heading }}
        </VLibRadixComboboxLabel>
        <slot />
    </VLibRadixComboboxGroup>
</template>
