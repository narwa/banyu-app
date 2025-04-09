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

const props = defineProps<Props>();
const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VLibRadixPopoverRoot>
        <VLibRadixPopoverTrigger as-child>
            <slot name="trigger" />
        </VLibRadixPopoverTrigger>
        <VLibRadixPopoverContent
            v-bind="{ ...forwarded, ...$attrs }"
            :class="cn('w-80', props.class)"
        >
            <slot />
        </VLibRadixPopoverContent>
    </VLibRadixPopoverRoot>
</template>
