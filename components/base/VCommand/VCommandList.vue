<script setup lang="ts">
import type { ComboboxContentEmits, ComboboxContentProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';

type Props = ComboboxContentProps & {
    class?: HTMLAttributes['class'];
};

const props = defineProps<Props>();
const emits = defineEmits<ComboboxContentEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VLibRadixComboboxContent
        v-bind="forwarded"
        :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)"
    >
        <div role="presentation">
            <slot />
        </div>
    </VLibRadixComboboxContent>
</template>
