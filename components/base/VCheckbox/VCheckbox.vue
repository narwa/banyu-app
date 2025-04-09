<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';
import { checkboxVariants } from '.';

const props = defineProps<CheckboxRootProps & {
    class?: HTMLAttributes['class'];
    labelClass?: HTMLAttributes['class'];
    label?: string;
}>();
const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const id = useId();
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <div class="flex items-center gap-x-2">
        <VLibRadixCheckboxRoot
            v-bind="forwarded"
            :id="id"
            v-slot="{ checked }"
            :class="cn(checkboxVariants(), 'overflow-hidden', props.class)"
        >
            <VLibRadixCheckboxIndicator class="animate-in slide-in-from-bottom flex h-full w-full items-center justify-center text-white">
                <Icon
                    v-if="checked === 'indeterminate'"
                    name="mdi:checkbox-intermediate"
                />

                <Icon name="mdi:check" />
            </VLibRadixCheckboxIndicator>
        </VLibRadixCheckboxRoot>

        <slot name="label">
            <label
                v-if="label"
                :for="id"
                :class="cn('block text-sm leading-none text-muted-700 dark:text-muted-200 select-none cursor-pointer', disabled && 'text-muted-400 dark:text-muted-500', labelClass)"
            >
                {{ label }}
            </label>
        </slot>
    </div>
</template>
