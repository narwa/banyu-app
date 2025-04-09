<script setup lang="ts">
import type { TabsTriggerProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardProps } from 'radix-vue';

const props = defineProps<TabsTriggerProps & {
    class?: HTMLAttributes['class'];
    justified?: boolean;
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <VLibRadixTabsTrigger
        v-bind="forwardedProps"
        :class="cn(
            'whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium transition-all text-yellow-800 hover:text-muted-700 focus-visible:outline-none outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-green-600 data-[state=active]:border-b-[3px] data-[state=active]:border-green-600',
            justified && 'flex-1',
            props.class,
        )"
    >
        <span class="truncate">
            <slot />
        </span>
    </VLibRadixTabsTrigger>
</template>
