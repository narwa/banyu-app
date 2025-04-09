<script setup lang="ts">
import type { TabsIndicatorProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

const props = defineProps<TabsIndicatorProps & {
    class?: HTMLAttributes['class'];
}>();
const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <VLibRadixTabsIndicator
        v-bind="delegatedProps"
        :class="cn('absolute px-3 left-0 h-[2px] bottom-0 w-[--radix-tabs-indicator-size] translate-x-[--radix-tabs-indicator-position] rounded-full transition-[width,transform] duration-300 disabled:opacity-50', props.class)"
    >
        <div class="bg-primary-800 w-full h-full" />
    </VLibRadixTabsIndicator>
</template>
