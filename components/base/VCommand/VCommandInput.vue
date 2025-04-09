<script setup lang="ts">
import type { ComboboxInputProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardProps } from 'radix-vue';

type Props = ComboboxInputProps & {
    class?: HTMLAttributes['class'];
    iconClass?: HTMLAttributes['class'];
    iconWrapperClass?: HTMLAttributes['class'];
};

defineOptions({
    inheritAttrs: false,
});

const props = defineProps<Props>();

const delegatedProps = computed(() => {
    const { class: _, iconClass: _iconClass, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <div :class="cn('relative border-b border-muted-200 dark:border-muted-800')">
        <div :class="cn('absolute inset-y-0 left-0 flex pl-5 items-center justify-center', iconWrapperClass)">
            <slot name="icon">
                <Icon
                    name="mdi:magnify"
                    :class="cn('stroke-[1] w-5 h-5 text-muted-500 dark:text-muted-400', props.iconClass)"
                />
            </slot>
        </div>
        <VLibRadixComboboxInput
            v-bind="{ ...forwardedProps, ...$attrs }"
            auto-focus
            :class="cn('font-sans block w-full h-11 px-12 bg-white border-0 text-sm text-muted-800 outline-none focus:outline-none focus:ring-0 placeholder-muted-300 duration-150 disabled:opacity-70 disabled:cursor-not-allowed dark:disabled:opacity-60 disabled:bg-muted-50 dark:disabled:bg-muted-700 dark:bg-muted-950 dark:text-muted-100 dark:placeholder-muted-500', props.class)"
        />
    </div>
</template>
