<script setup lang="ts">
import type { TabsContentProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

const props = defineProps<TabsContentProps & {
    class?: HTMLAttributes['class'];
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <VLibRadixTabsContent
        :class="cn('mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', props.class)"
        v-bind="delegatedProps"
    >
        <slot />
    </VLibRadixTabsContent>
</template>
