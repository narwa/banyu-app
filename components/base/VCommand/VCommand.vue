<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';

type Props = ComboboxRootProps & {
    class?: HTMLAttributes['class'];
    placeholder?: string;
};

const props = defineProps<Props>();
const emits = defineEmits<ComboboxRootEmits>();

const delegatedProps = computed(() => {
    const { placeholder: _placeholder, class: _class, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VCommandRoot
        v-bind="forwarded"
        :class="cn('rounded-lg border border-muted-200 dark:border-muted-800 shadow-lg max-w-[600px]', props.class)"
    >
        <slot name="input">
            <VCommandInput :placeholder="props.placeholder ?? 'Enter command or search...'" />
        </slot>
        <VCommandList>
            <slot name="empty">
                <VCommandEmpty />
            </slot>
            <slot />
        </VCommandList>
    </VCommandRoot>
</template>
