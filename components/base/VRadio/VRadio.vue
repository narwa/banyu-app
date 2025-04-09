<script setup lang="ts">
import type { RadioGroupItemProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardProps } from 'radix-vue';

const props = defineProps<RadioGroupItemProps & {
    class?: HTMLAttributes['class'];
    label?: string;
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const id = useId();
const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <div :class="cn('flex items-center space-x-2', props.class)">
        <VLibRadixRadioGroupItem
            v-bind="forwardedProps"
            :id="id"
            :class="
                cn(
                    'aspect-square h-[18px] w-[18px] rounded-full border text-current border-muted-200 focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-muted-100 data-[state=checked]:bg-primary-800 data-[state=checked]:border-primary-800 data-[state=checked]:text-white dark:bg-muted-700 dark:border-muted-600 dark:data-[state=checked]:bg-primary-700 dark:data-[state=checked]:border-primary-700 dark:focus:ring-offset-0 dark:disabled:bg-muted-800',
                )
            "
        >
            <VLibRadixRadioGroupIndicator class="flex items-center justify-center animate-in slide-in-from-bottom">
                <span class="h-1.5 w-1.5 bg-white rounded-full" />
            </VLibRadixRadioGroupIndicator>
        </VLibRadixRadioGroupItem>

        <slot name="label">
            <label
                v-if="label"
                :for="id"
                :class="cn('block text-sm leading-none text-muted-700 dark:text-muted-200', disabled && 'text-muted-400 dark:text-muted-500')"
            >
                {{ label }}
            </label>
        </slot>
    </div>
</template>
