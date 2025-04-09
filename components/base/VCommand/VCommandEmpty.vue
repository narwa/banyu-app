<script setup lang="ts">
import type { ComboboxEmptyProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

type Props = ComboboxEmptyProps & {
    class?: HTMLAttributes['class'];
};

const props = defineProps<Props>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <VLibRadixComboboxEmpty
        v-bind="delegatedProps"
        :class="cn('py-6 text-center text-sm', props.class)"
    >
        <slot>
            <VEmpty />
        </slot>
    </VLibRadixComboboxEmpty>
</template>
