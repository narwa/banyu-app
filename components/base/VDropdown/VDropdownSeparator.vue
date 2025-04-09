<script setup lang="ts">
import type { DropdownMenuSeparatorProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuSeparatorProps & {
    class?: HTMLAttributes['class'];
}>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <VLibRadixDropdownMenuSeparator
        v-bind="delegatedProps"
        :class="cn('-mx-1 my-1 h-px border-t border-muted-200', props.class)"
    />
</template>
